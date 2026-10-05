import os, re, json, xml.etree.ElementTree as ET

# Load template SVG
with open('reference_megha/stack.svg', 'r', encoding='utf-8') as f:
    template_svg = f.read()

# Extract defs
defs_content = re.search(r'<defs>(.*?)</defs>', template_svg, re.DOTALL).group(1)

# Icon SVG paths (viewBox 0 0 24 24)
ICONS = {
    "react": {
        "color": "#61DAFB",
        "label": "React",
        "path": "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278z"
    },
    "redux": {
        "color": "#764ABC",
        "label": "Redux",
        "path": "M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.957v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.326-1.663zM24 11.39v1.218c-1.128.108-1.817.944-2.226 2.268-.407 1.319-.463 2.937-.42 4.186.045 1.3-.968 2.5-2.337 2.5H4.985c-1.37 0-2.383-1.2-2.337-2.5.043-1.249-.013-2.867-.42-4.186-.41-1.324-1.1-2.16-2.228-2.268V11.39c1.128-.108 1.819-.944 2.227-2.268.408-1.319.464-2.937.42-4.186-.045-1.3.968-2.5 2.338-2.5h14.032c1.37 0 2.382 1.2 2.337 2.5-.043 1.249.013 2.867.42 4.186.409 1.324 1.098 2.16 2.226 2.268zm-7.927 2.817c0-1.354-.953-2.333-2.368-2.488v-.057c1.04-.169 1.856-1.135 1.856-2.213 0-1.537-1.213-2.538-3.062-2.538h-4.16v10.172h4.181c2.218 0 3.553-1.086 3.553-2.876z"
    },
    "mui": {
        "color": "#007FFF",
        "label": "MUI",
        "path": "M0 2.475v10.39l3 1.733V7.67l6 3.465 6-3.465v3.465l-6 3.465-3-1.733v3.465l6 3.465 9-5.198V7.67l3-1.73V2.475L15 7.67l-6-3.465-9-5.197zm15 6.93l3 1.733v3.465l-3-1.733V9.405z"
    },
    "tailwind": {
        "color": "#38B2AC",
        "label": "TailwindCSS",
        "path": "M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"
    },
    "javascript": {
        "color": "#F7DF1E",
        "label": "JavaScript",
        "path": "M0 0h24v24H0V0zm22.034 18.276c-.175-1.017-.888-1.798-2.176-2.307-.63-.248-1.295-.414-1.977-.497l-.427-.052c-.77-.092-1.127-.272-1.127-.611 0-.398.376-.641 1.05-.641.649 0 1.042.233 1.272.748l2.088-1.34c-.495-.989-1.397-1.545-2.685-1.545-1.921 0-3.327 1.106-3.327 2.825 0 1.223.757 2.057 2.193 2.522l.718.233c.893.291 1.272.563 1.272.97 0 .447-.466.728-1.242.728-.961 0-1.475-.437-1.815-1.136l-2.145 1.252c.573 1.281 1.728 2.019 3.65 2.019 2.184 0 3.698-1.077 3.698-2.867h-.047zm-8.831.339v-7.91h-2.484v7.958c0 1.65-.883 2.3-2.271 2.3-.65 0-1.281-.194-1.727-.475l-.543 1.892c.699.417 1.66.67 2.659.67 2.824 0 4.366-1.562 4.366-4.435z"
    },
    "html5": {
        "color": "#E34F26",
        "label": "HTML5",
        "path": "M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.123l-.371 4.161-2.91.787-2.903-.782-.188-2.115h-2.61l.364 4.363 5.337 1.482 5.347-1.482.729-8.136H8.531z"
    },
    "css3": {
        "color": "#1572B6",
        "label": "CSS3",
        "path": "M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.123l-.371 4.161-2.91.787-2.903-.782-.188-2.115h-2.61l.364 4.363 5.337 1.482 5.347-1.482.729-8.136H8.531z"
    },
    "node": {
        "color": "#5FA04E",
        "label": "Node.js",
        "path": "M12 10.155c-.206 0-.401.054-.57.151l-3.262 1.884c-.354.204-.57.578-.57.986v3.766c0 .408.216.782.57.986l3.262 1.884c.169.098.364.151.57.151.206 0 .401-.053.57-.151l3.262-1.884c.354-.204.57-.578.57-.986v-3.766c0-.408-.216-.782-.57-.986l-3.262-1.884c-.169-.097-.364-.151-.57-.151zm-7.71-5.46c-.206 0-.401.054-.57.151L.458 6.73C.104 6.934 0 7.308 0 7.716v3.766c0 .408.104.782.458.986l3.262 1.884c.169.098.364.151.57.151.206 0 .401-.053.57-.151l3.262-1.884c.354-.204.57-.578.57-.986V7.716c0-.408-.216-.782-.57-.986L4.86 4.846a1.144 1.144 0 0 0-.57-.151zm15.42 0c-.206 0-.401.054-.57.151l-3.262 1.884c-.354.204-.57.578-.57.986v3.766c0 .408.216.782.57.986l3.262 1.884c.169.098.364.151.57.151.206 0 .401-.053.57-.151l3.262-1.884c.354-.204.458-.578.458-.986V7.716c0-.408-.104-.782-.458-.986l-3.262-1.884a1.144 1.144 0 0 0-.57-.151z"
    },
    "express": {
        "color": "#eceef6",
        "label": "Express.js",
        "path": "M24 18.588l-5.719-7.147 5.37-6.702h-4.045l-3.415 4.373-3.46-4.373H8.384l5.416 6.702-5.764 7.147h4.09l3.807-4.819 3.807 4.819H24zM5.385 10.978c-.287-.52-.705-.935-1.253-1.246-.549-.31-1.208-.466-1.979-.466-.69 0-1.305.143-1.846.43-.54.286-.96.697-1.258 1.233C.145 11.455.006 12.08 0 12.8c0 .736.145 1.37.435 1.902.29.531.71.942 1.258 1.233.548.291 1.17.437 1.868.437.756 0 1.402-.152 1.939-.456.536-.304.945-.722 1.226-1.255.281-.532.422-1.156.422-1.872 0-.712-.137-1.325-.411-1.839l-.352.028zm-1.846 3.013c-.15.285-.36.507-.63.666-.27.159-.58.238-.93.238-.344 0-.65-.078-.918-.235-.268-.157-.475-.378-.621-.663-.146-.285-.219-.623-.219-1.013s.073-.728.219-1.013c.146-.285.353-.506.621-.663.268-.157.574-.235.918-.235.35 0 .66.079.93.238.27.159.48.381.63.666.15.285.225.623.225 1.013s-.075.728-.225 1.013z"
    },
    "mongodb": {
        "color": "#47A248",
        "label": "MongoDB",
        "path": "M11.996 0c-.39 0-.74.19-.94.51L3.54 12.82c-.37.6-.2 1.38.38 1.78l7.14 4.88c.31.21.68.32 1.05.32.38 0 .75-.11 1.06-.32l7.02-4.88c.58-.4.74-1.18.38-1.78L13.06.51c-.2-.32-.55-.51-.94-.51zM12 2.5l6.5 10.4-5.5 3.83V5.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v11.23L4.5 12.9 12 2.5z"
    },
    "jwt": {
        "color": "#D63AFF",
        "label": "JWT",
        "path": "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.25 17.5h-2.5v-11h2.5v11zm5 0h-2.5v-11h2.5v11z"
    },
    "docker": {
        "color": "#2496ED",
        "label": "Docker",
        "path": "M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186zm5.893 2.714h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185zm-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185zm-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.186-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.083.185.186.185M23.95 9.77a.64.64 0 00-.51-.34c-.81-.14-1.95.2-2.73 1.05-.44-.27-.95-.42-1.48-.42h-.08c-.28 0-.56.04-.82.12-.13-.72-.6-1.34-1.29-1.68-.42-.21-.89-.32-1.37-.32H.19A.186.186 0 000 8.35v6.52c0 2.27 1.15 4.3 3.08 5.43 1.77 1.04 3.92 1.48 6.13 1.25 4.14-.42 7.74-3.32 8.78-7.31.28.02.56.03.84.03 1.5 0 2.94-.48 4.09-1.38.74-.58 1.06-1.54 1.03-2.43a.64.64 0 00-.07-.69z"
    },
    "aws": {
        "color": "#FF9900",
        "label": "AWS",
        "path": "M6.72 13.06c0-.85.34-1.62.91-2.18l-1.8-1.8A5.5 5.5 0 0 0 4.17 13c0 1.56.65 2.97 1.7 3.98l1.8-1.8c-.59-.57-.95-1.35-.95-2.12zm10.56 0c0 .77-.36 1.55-.95 2.12l1.8 1.8A5.5 5.5 0 0 0 19.83 13c0-1.56-.65-2.97-1.7-3.98l-1.8 1.8c.57.56.95 1.33.95 2.24zm-5.28-5.28c.77 0 1.55.36 2.12.95l1.8-1.8A5.5 5.5 0 0 0 12 4.17c-1.56 0-2.97.65-3.98 1.7l1.8 1.8c.56-.57 1.33-.91 2.18-.91zm0 10.56c-.85 0-1.62-.34-2.18-.91l-1.8 1.8c1.01 1.05 2.42 1.7 3.98 1.7 1.56 0 2.97-.65 3.98-1.7l-1.8-1.8c-.57.59-1.35.91-2.18.91zM12 0L1.6 6v12L12 24l10.4-6V6L12 0zm8.4 16.8L12 21.6 3.6 16.8V7.2L12 2.4l8.4 4.8v9.6z"
    },
    "nginx": {
        "color": "#009639",
        "label": "Nginx",
        "path": "M12 0L1.605 6v12L12 24l10.395-6V6L12 0zM6.5 6.5h2.2l6.6 9.2V6.5h2.2v11h-2.2l-6.6-9.2v9.2H6.5v-11z"
    },
    "cloudinary": {
        "color": "#18BFFF",
        "label": "Cloudinary",
        "path": "M19.33 9.47A6.47 6.47 0 0 0 7.37 6.54a4.8 4.8 0 0 0-4.08 4.72 4.8 4.8 0 0 0 .53 2.19A4.15 4.15 0 0 0 3.75 21h15.5a4.75 4.75 0 0 0 .08-9.53z"
    },
    "vercel": {
        "color": "#eceef6",
        "label": "Vercel",
        "path": "M24 22.525H0l12-21.05 12 21.05z"
    },
    "git": {
        "color": "#F05032",
        "label": "Git",
        "path": "M13.09 23.549a1.54 1.54 0 0 1-2.18 0L.451 13.089a1.54 1.54 0 0 1 0-2.179l7.191-7.19 2.733 2.733a1.85 1.85 0 0 0 .964 2.326v6.66a1.849 1.849 0 1 0 1.54 0V8.957l2.508 2.508a1.85 1.85 0 1 0 1.09-1.09l-2.634-2.634a1.85 1.85 0 0 0-2.378-2.377L8.73 2.63 10.91.451a1.54 1.54 0 0 1 2.179 0l10.459 10.46a1.54 1.54 0 0 1 0 2.179z"
    },
    "github": {
        "color": "#eceef6",
        "label": "GitHub",
        "path": "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
    },
    "postman": {
        "color": "#FF6C37",
        "label": "Postman",
        "path": "M13.59.001C6.084.001 0 6.084 0 13.589c0 7.506 6.084 13.59 13.59 13.59 7.505 0 13.589-6.084 13.589-13.59 0-7.505-6.084-13.588-13.589-13.588zm4.846 6.094a1.72 1.72 0 1 1 0 3.441 1.72 1.72 0 0 1 0-3.441zm-9.08 1.832a1.72 1.72 0 1 1 0 3.44 1.72 1.72 0 0 1 0-3.44zm6.05 4.02a2.38 2.38 0 1 1 0 4.76 2.38 2.38 0 0 1 0-4.76zm-5.74 3.737a1.72 1.72 0 1 1 0 3.44 1.72 1.72 0 0 1 0-3.44zm9.08 1.832a1.72 1.72 0 1 1 0 3.44 1.72 1.72 0 0 1 0-3.44z"
    },
    "vite": {
        "color": "#646CFF",
        "label": "Vite",
        "path": "M23.998 3.565L12.639 23.493a.75.75 0 01-1.284-.008L.003 3.565a.75.75 0 01.996-1.05l10.999 5.865 10.999-5.865a.75.75 0 011.001 1.05z"
    },
    "photoshop": {
        "color": "#31A8FF",
        "label": "Photoshop",
        "path": "M0 0v24h24V0H0zm2.25 2.25h19.5v19.5H2.25V2.25zm4.875 3.375c-.375 0-.75.094-1.125.281-.375.188-.656.469-.844.844-.188.375-.281.844-.281 1.406v8.438h2.25v-3.375h1.688c.844 0 1.5-.188 1.969-.563.469-.375.703-.938.703-1.688 0-.75-.234-1.313-.703-1.688-.469-.375-1.125-.563-1.969-.563H7.125v-3.092zm2.25 2.063c.375 0 .656.094.844.281.188.188.281.469.281.844 0 .375-.094.656-.281.844-.188.188-.469.281-.844.281h-1.406V7.688h1.406zm6.188 4.219c-.563 0-1.031.094-1.406.281-.375.188-.656.469-.844.844-.188.375-.281.844-.281 1.406v.281h2.25v-.281c0-.281.094-.469.281-.563.188-.094.469-.141.844-.141.375 0 .656.047.844.141.188.094.281.281.281.563 0 .188-.094.375-.281.469-.188.094-.469.188-.844.281l-1.125.281c-.75.188-1.313.469-1.688.844-.375.375-.563.938-.563 1.688 0 .75.281 1.313.844 1.688.563.375 1.313.563 2.25.563.656 0 1.219-.094 1.688-.281.469-.188.844-.469 1.125-.844v.938h2.063v-5.063c0-.844-.281-1.5-.844-1.969-.563-.469-1.313-.703-2.25-.703z"
    }
}

# Categories setup - with escaped &amp;
categories = [
    {
        "title": "FRONTEND &amp; UI",
        "tag_color": "#22d3ee",
        "y_header": 133,
        "y_chips": 148,
        "items": ["react", "redux", "mui", "tailwind", "javascript", "html5", "css3"]
    },
    {
        "title": "BACKEND &amp; DATABASE",
        "tag_color": "#38ef7d",
        "y_header": 213,
        "y_chips": 228,
        "items": ["node", "express", "mongodb", "jwt"]
    },
    {
        "title": "DEVOPS &amp; CLOUD",
        "tag_color": "#FF9900",
        "y_header": 293,
        "y_chips": 308,
        "items": ["docker", "aws", "nginx", "cloudinary", "vercel"]
    },
    {
        "title": "TOOLS &amp; WORKFLOW",
        "tag_color": "#f472b6",
        "y_header": 373,
        "y_chips": 388,
        "items": ["git", "github", "postman", "vite", "photoshop"]
    }
]

# Build chips SVG
chip_elements = []
delay = 0.5
pulse_begin = 2.5

for cat_idx, cat in enumerate(categories):
    # Category header
    y_h = cat["y_header"]
    chip_elements.append(f'''<g class="chip" style="animation-delay:{delay:.2f}s">
  <rect x="552" y="{y_h - 5}" width="14" height="3" rx="1.5" fill="{cat['tag_color']}"/>
  <text class="jbb" x="574" y="{y_h}" font-size="11.5" fill="#8d93ab" letter-spacing="2">{cat['title']}</text>
</g>''')
    delay += 0.06

    current_x = 552.0
    y_c = cat["y_chips"]

    for item_key in cat["items"]:
        item = ICONS[item_key]
        lbl = item["label"]
        col = item["color"]
        path_d = item["path"]

        char_len = len(lbl)
        chip_w = max(78, int(46 + char_len * 7.8 + 14))
        
        chip_svg = f'''<g class="chip" style="animation-delay:{delay:.2f}s">
  <rect x="{current_x:.1f}" y="{y_c}" width="{chip_w}" height="40" rx="12" fill="{col}" fill-opacity=".08"/>
  <rect x="{current_x + 0.5:.1f}" y="{y_c + 0.5}" width="{chip_w - 1}" height="39" rx="11.5" fill="none" stroke="{col}" stroke-opacity=".3">
    <animate attributeName="stroke-opacity" values=".3;1;.3;.3" keyTimes="0;.04;.14;1" dur="7.20s" begin="{pulse_begin:.2f}s" repeatCount="indefinite"/>
  </rect>
  <g transform="translate({current_x + 22:.1f},{y_c + 20})">
    <g transform="translate(-10.0,-10.0) scale(0.8333)" color="{col}" style="color:{col}">
      <path fill="currentColor" d="{path_d}"/>
    </g>
  </g>
  <text class="jb" x="{current_x + 41:.1f}" y="{y_c + 24.5}" font-size="13" fill="#eceef6">{lbl}</text>
</g>'''
        chip_elements.append(chip_svg)
        current_x += chip_w + 10.0
        delay += 0.05
        pulse_begin += 0.35

full_chips_markup = "\n".join(chip_elements)

# Build full SVG
svg_output = f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1280 480" width="1280" height="480" role="img" aria-label="Tech stack">
<title>Tech stack - Jai Kishan Kumar</title>
<desc>Tech icons orbiting a MERN-style atom, and a grouped grid: frontend, backend and database, devops and cloud, tools and workflow.</desc>
<defs>
{defs_content}
</defs>
<rect width="1280" height="480" rx="24" fill="url(#cardbg)"/>
<rect width="1280" height="480" rx="24" fill="url(#dots3)"/>
<rect x=".75" y=".75" width="1278.5" height="478.5" rx="23.25" fill="none" stroke="url(#edge)" stroke-width="1.5"/>

<!-- Left/Top Header -->
<g class="fu" style="animation-delay:.1s">
  <text class="jbb" x="40" y="54" font-size="12.5" fill="#22d3ee" letter-spacing="2.2">// TECH STACK</text>
  <text class="sg" x="40" y="94" font-size="29" fill="#eceef6" letter-spacing="-.5">Tools I build with</text>
</g>

<!-- Center / Orbiting Atom -->
<line x1="520" y1="120" x2="520" y2="440" stroke="#262a42" stroke-width="1"/>
<path d="M434.0 290.0A172 105 0 1 1 90.0 290.0A172 105 0 1 1 434.0 290.0Z" fill="none" stroke="#61dafb" stroke-opacity=".22" stroke-width="1.6" stroke-dasharray="1400" stroke-dashoffset="0"><animate attributeName="stroke-dashoffset" values="1400;1400;0" keyTimes="0;0.111;1" dur="1.8s" begin="0s" fill="freeze"/></path>
<path d="M348.0 439.0A172 105 60 1 1 176.0 141.0A172 105 60 1 1 348.0 439.0Z" fill="none" stroke="#61dafb" stroke-opacity=".22" stroke-width="1.6" stroke-dasharray="1400" stroke-dashoffset="0"><animate attributeName="stroke-dashoffset" values="1400;1400;0" keyTimes="0;0.220;1" dur="2.05s" begin="0s" fill="freeze"/></path>
<path d="M176.0 439.0A172 105 120 1 1 348.0 141.0A172 105 120 1 1 176.0 439.0Z" fill="none" stroke="#61dafb" stroke-opacity=".22" stroke-width="1.6" stroke-dasharray="1400" stroke-dashoffset="0"><animate attributeName="stroke-dashoffset" values="1400;1400;0" keyTimes="0;0.304;1" dur="2.3s" begin="0s" fill="freeze"/></path>

<!-- Central Glowing Nucleus -->
<g class="core" transform="translate(262, 290)">
  <circle r="46" fill="url(#halo)"/>
  <circle r="34" fill="url(#coreG)"/>
  <text class="sg" x="0" y="8" font-size="20" fill="#fff" text-anchor="middle" font-weight="bold">MERN</text>
</g>

<!-- Orbit 0: React orbiting + Node moon -->
<g opacity="0">
  <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.667;0.933;1" dur="1.50s" begin="0s" fill="freeze"/>
  <animateMotion dur="24s" begin="0.0s" repeatCount="indefinite"><mpath href="#orb0"/></animateMotion>
  <circle r="36" fill="none" stroke="#61dafb" stroke-opacity=".3" stroke-width="1.2" stroke-dasharray="4 5"/>
  <g>
    <animateMotion dur="7s" begin="-0.0s" repeatCount="indefinite"><mpath href="#moonPath"/></animateMotion>
    <circle r="13" fill="#171a2c" stroke="#5FA04E" stroke-opacity=".8" stroke-width="1.35"/>
    <g transform="translate(-5.5,-5.5) scale(0.458)" color="#5FA04E" style="color:#5FA04E">
      <path fill="currentColor" d="{ICONS['node']['path']}"/>
    </g>
  </g>
  <circle r="22" fill="#171a2c" stroke="#61DAFB" stroke-opacity=".8" stroke-width="1.35"/>
  <g transform="translate(-7.48,-7.48) scale(0.6233)" color="#61DAFB" style="color:#61DAFB">
    <path fill="currentColor" d="{ICONS['react']['path']}"/>
  </g>
</g>

<!-- Orbit 1: MongoDB orbiting + Express moon -->
<g opacity="0">
  <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.667;0.933;1" dur="1.50s" begin="0s" fill="freeze"/>
  <animateMotion dur="28s" begin="-9.0s" repeatCount="indefinite"><mpath href="#orb1"/></animateMotion>
  <circle r="36" fill="none" stroke="#47A248" stroke-opacity=".3" stroke-width="1.2" stroke-dasharray="4 5"/>
  <g>
    <animateMotion dur="7s" begin="-3.5s" repeatCount="indefinite"><mpath href="#moonPath"/></animateMotion>
    <circle r="13" fill="#171a2c" stroke="#eceef6" stroke-opacity=".8" stroke-width="1.35"/>
    <g transform="translate(-5.5,-5.5) scale(0.458)" color="#eceef6" style="color:#eceef6">
      <path fill="currentColor" d="{ICONS['express']['path']}"/>
    </g>
  </g>
  <circle r="22" fill="#171a2c" stroke="#47A248" stroke-opacity=".8" stroke-width="1.35"/>
  <g transform="translate(-7.48,-7.48) scale(0.6233)" color="#47A248" style="color:#47A248">
    <path fill="currentColor" d="{ICONS['mongodb']['path']}"/>
  </g>
</g>

<!-- Orbit 2: JavaScript orbiting + Docker moon -->
<g opacity="0">
  <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.667;0.933;1" dur="1.50s" begin="0s" fill="freeze"/>
  <animateMotion dur="26s" begin="-18.0s" repeatCount="indefinite"><mpath href="#orb2"/></animateMotion>
  <circle r="36" fill="none" stroke="#F7DF1E" stroke-opacity=".3" stroke-width="1.2" stroke-dasharray="4 5"/>
  <g>
    <animateMotion dur="7s" begin="-1.5s" repeatCount="indefinite"><mpath href="#moonPath"/></animateMotion>
    <circle r="13" fill="#171a2c" stroke="#2496ED" stroke-opacity=".8" stroke-width="1.35"/>
    <g transform="translate(-5.5,-5.5) scale(0.458)" color="#2496ED" style="color:#2496ED">
      <path fill="currentColor" d="{ICONS['docker']['path']}"/>
    </g>
  </g>
  <circle r="22" fill="#171a2c" stroke="#F7DF1E" stroke-opacity=".8" stroke-width="1.35"/>
  <g transform="translate(-7.48,-7.48) scale(0.6233)" color="#F7DF1E" style="color:#F7DF1E">
    <path fill="currentColor" d="{ICONS['javascript']['path']}"/>
  </g>
</g>

<!-- Chips / Right Column -->
{full_chips_markup}

</svg>'''

with open('stack.svg', 'w', encoding='utf-8') as f:
    f.write(svg_output)

# Validate with XML parser
ET.parse('stack.svg')
print("XML validation passed 100%!")
