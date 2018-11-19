# @nota/env-in-template

Simple script to inject variables from shell ENV into a file.

Useful when building a multistage docker image.

## Usage:
env-in-template INPUT_FILE OUTPUT_FILE

**Example:**

Input file "input.json-tmpl" with this content:
```
{
  <% if (typeof ssl !== 'undefined' && ssl) {
    %>
    "SSL": <% print(JSON.stringify(ssl)) %>,
    <%
  }
  %>
  "PATH": "<%= PATH %>"
}
```

Run:
```bash
env-in-template input.json-tmpl output.json
```

Creates "output.json" with this content:
```javascript
{

  "PATH": "/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin"
}
```

Adding `ssl` to the environment variables:
```bash
ssl=1 env-in-template input.json-tmpl output.json
```

Will create "output.json" with this content:
```javascript
{
    "SSL": "1",

  "PATH": "/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin"
}
```
