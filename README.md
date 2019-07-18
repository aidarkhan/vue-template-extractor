# Vue template extractor

Webpack loader for extract html in the vue template tag and remove it from bundle js.

## Webpack config

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          },
          {
            loader: 'vue-template-extractor',
            options: {
              ext: 'php',
              fileName: '[name].[ext]'
            },
          },
        ],
      },
    ],
  },
};
```

## Optons

#### ext

Output file extension. By default is `php`. You can write any text file extension.

#### fileName

Output file name. By default is `[name].[ext]`.
