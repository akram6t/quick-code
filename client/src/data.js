export const DEFAULT_HTML = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Code Editor</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
          darkMode: 'class'
        }
    </script>
  </head>
  <body>
    <h1>World Hello</h1>
  </body>
</html>`


export const combinedOutput = ({ html, css, js, isDark }) =>  `
      <html class="${isDark ? 'dark' : ''}">
        <head>
          <style>
          body{
            font-family: 'arial', sans-sarif;
          }
          ${css}
          ${isDark ? 'body { color: white; background-color: #1a1a1a; }' : ''}
          </style>
          <script>
            const consoleMethods = ['log', 'error', 'warn', 'info', 'debug'];
            consoleMethods.forEach((method) => {
              const originalMethod = console[method];
              console[method] = (...args) => {
                originalMethod.apply(console, args);
                window.parent.postMessage({ type: 'console', message: { method, args } }, '*');
              };
            });

            window.onerror = (message, source, lineno, colno, error) => {
              window.parent.postMessage({ type: 'console', message: { method: 'error', args: [message] } }, '*');
              return true;
            };
          </script>
        </head>
        <body>
            ${html}
            <script>${js}</script>
        </body>
      </html>
    `;