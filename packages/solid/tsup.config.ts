import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ['solid-js', 'vike-solid'],
  minify: true, // from 21kb to 10.97kb
  // minify: 'terser', // from 21kb to 10.99kb
});

// const preset_options: preset.PresetOptions = {
//   // array or single object
//   entries: [
//     // default entry (index)
//     {
//       // entries with '.tsx' extension will have `solid` export condition generated
//       entry: 'src/index.tsx',
//       // will generate a separate development entry
//       dev_entry: true,
//     },
//   ],
//   // Set to `true` to remove all `console.*` calls and `debugger` statements in prod builds
//   drop_console: true,
//   // Set to `true` to generate a CommonJS build alongside ESM
//   // cjs: true,
// };

// const CI =
//   process.env['CI'] === 'true' ||
//   process.env['GITHUB_ACTIONS'] === 'true' ||
//   process.env['CI'] === '"1"' ||
//   process.env['GITHUB_ACTIONS'] === '"1"';

// export default defineConfig((config) => {
//   const watching = !!config.watch;

//   const parsed_options = preset.parsePresetOptions(preset_options, watching);

//   if (!watching && !CI) {
//     const package_fields = preset.generatePackageExports(parsed_options);

//     console.log(`package.json: \n\n${JSON.stringify(package_fields, null, 2)}\n\n`);

//     // will update ./package.json with the correct export fields
//     preset.writePackageJson(package_fields);
//   }

//   const newConfig = preset.generateTsupOptions(parsed_options);
//   return newConfig;
// });
