import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs, configureVueProject } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

configureVueProject({
    tsSyntaxInTemplates: true, // Set true or false based on your needs.
    scriptLangs: ['ts', 'js'], // You can include other languages here if needed.
});

export default defineConfigWithVueTs(
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,mts,tsx,vue}'],
    },
    globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),
    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,
    skipFormatting
);