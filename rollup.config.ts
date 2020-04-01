/* eslint-disable import/no-extraneous-dependencies */
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package.json');

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    external: Object.keys(pkg.dependencies),
    plugins: [typescript(), resolve(), terser({ output: { comments: false } })],
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
      name: 'readEnv',
    },
    plugins: [
      typescript(),
      commonjs(),
      resolve(),
      terser({ output: { comments: false } }),
    ],
  },
];

export default config;
