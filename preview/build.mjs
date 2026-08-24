import * as esbuild from 'esbuild';
import path from 'node:path';

const alias = {
  name: 'at-alias',
  setup(build) {
    build.onResolve({ filter: /^@\// }, async (args) => {
      const target = path.join(process.cwd(), args.path.slice(2));
      // Hand the extension-less path back to esbuild's normal resolver.
      return build.resolve('./' + path.relative(args.resolveDir, target).replace(/\\/g, '/'), {
        resolveDir: args.resolveDir,
        kind: args.kind,
      });
    });
  },
};

const result = await esbuild.build({
  absWorkingDir: process.cwd(),
  entryPoints: ['preview/entry.tsx'],
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  minify: true,
  define: { 'process.env.NODE_ENV': '"production"' },
  plugins: [alias],
  outdir: 'preview/out',
  entryNames: 'bundle',
  logLevel: 'warning',
  metafile: true,
});

for (const [file, meta] of Object.entries(result.metafile.outputs)) {
  console.log(`${path.basename(file).padEnd(14)} ${(meta.bytes / 1024).toFixed(1)} KB`);
}
