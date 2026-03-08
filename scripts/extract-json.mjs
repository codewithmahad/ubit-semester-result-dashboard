import fs from 'fs';
import path from 'path';

const logDir = 'C:\\Users\\codew\\.gemini\\antigravity\\brain\\d1ef02ab-472b-4e7b-9b25-b586cae90c71\\.system_generated\\logs';

function extractJson() {
    const files = fs.readdirSync(logDir);
    for (const file of files) {
        if (!file.endsWith('.txt')) continue;
        const content = fs.readFileSync(path.join(logDir, file), 'utf8');
        const startIndex = content.lastIndexOf('{\n  "CS(SE)-353_Intro_to_ICT": {');
        if (startIndex !== -1) {
            console.log('Found json start in', file, 'at index', startIndex);
            let braceCount = 0;
            let inString = false;
            let escapeNext = false;

            for (let i = startIndex; i < content.length; i++) {
                const char = content[i];
                if (escapeNext) {
                    escapeNext = false;
                    continue;
                }
                if (char === '\\') {
                    escapeNext = true;
                    continue;
                }
                if (char === '"') {
                    inString = !inString;
                }
                if (!inString) {
                    if (char === '{') braceCount++;
                    if (char === '}') {
                        braceCount--;
                        if (braceCount === 0) {
                            const jsonStr = content.substring(startIndex, i + 1);
                            fs.writeFileSync('scripts/raw-sem1.json', jsonStr);
                            console.log('Successfully extracted JSON! Length:', jsonStr.length);
                            return;
                        }
                    }
                }
            }
        }
    }
    console.log('Failed to find JSON block');
}

extractJson();
