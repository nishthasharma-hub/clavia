/* ── Horizon: regulatory impact ─────────────────────────────────
   Legal's standing watch on the law, as designed in the "Clavia Regulatory
   Impact" artifact (Harvey's scan flow in Clavia's design). Watches as cards, each with a
   weekly digest and its updates. An update is one page: its AI Summary (with what Clavia
   checked), then the documents it touches, each with a finding, a priority, a due date and an
   assignee, and Activity. An update is Open, Completed (when no document is left open) or
   Archived (from ⋯, for the whole team). A new watch is said in plain words.
   Self-contained: its helpers and state live in this closure, its styles under
   .hzx (horizon-impact.css). Clavia renders #horizon with window.hzxView().
   Demo content: the law described is summarised for illustration. */
(() => {
const QUILL = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4Ij48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuMDI7dHJhbnNmb3JtLW9yaWdpbjoxMy4yMHB4IDM0LjE1cHgiIGQ9Ik0xMy4yMCAzNC4xNSBRMTQuODUgMzQuMzQgMTYuMjAgMzMuODciLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuMDQ7dHJhbnNmb3JtLW9yaWdpbjoxMy42M3B4IDMzLjUwcHgiIGQ9Ik0xMy42MyAzMy41MCBRMTUuOTQgMzMuNzcgMTcuODMgMzMuMTEiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuMDc7dHJhbnNmb3JtLW9yaWdpbjoxNC4wN3B4IDMyLjg0cHgiIGQ9Ik0xNC4wNyAzMi44NCBRMTYuODggMzMuMTggMTkuMTkgMzIuMzgiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuMDk7dHJhbnNmb3JtLW9yaWdpbjoxNC41MnB4IDMyLjE5cHgiIGQ9Ik0xNC41MiAzMi4xOSBRMTcuNzQgMzIuNTggMjAuNDAgMzEuNjYiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuMTE7dHJhbnNmb3JtLW9yaWdpbjoxNC45OHB4IDMxLjU0cHgiIGQ9Ik0xNC45OCAzMS41NCBRMTguNTYgMzEuOTcgMjEuNTEgMzAuOTUiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuMTM7dHJhbnNmb3JtLW9yaWdpbjoxNS40NXB4IDMwLjg5cHgiIGQ9Ik0xNS40NSAzMC44OSBRMTkuMzUgMzEuMzYgMjIuNTYgMzAuMjUiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuMTY7dHJhbnNmb3JtLW9yaWdpbjoxNS45M3B4IDMwLjI0cHgiIGQ9Ik0xNS45MyAzMC4yNCBRMjAuMTIgMzAuNzUgMjMuNTcgMjkuNTYiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuMTg7dHJhbnNmb3JtLW9yaWdpbjoxNi40MnB4IDI5LjU5cHgiIGQ9Ik0xNi40MiAyOS41OSBRMjAuODYgMzAuMTMgMjQuNTMgMjguODciLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuMjA7dHJhbnNmb3JtLW9yaWdpbjoxNi45MnB4IDI4Ljk0cHgiIGQ9Ik0xNi45MiAyOC45NCBRMjEuNjAgMjkuNTEgMjUuNDUgMjguMTgiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuMjI7dHJhbnNmb3JtLW9yaWdpbjoxNy40MnB4IDI4LjI5cHgiIGQ9Ik0xNy40MiAyOC4yOSBRMjIuMzIgMjguODggMjYuMzUgMjcuNDkiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuMjQ7dHJhbnNmb3JtLW9yaWdpbjoxNy45NHB4IDI3LjY0cHgiIGQ9Ik0xNy45NCAyNy42NCBRMjMuMDMgMjguMjYgMjcuMjIgMjYuODEiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuMjc7dHJhbnNmb3JtLW9yaWdpbjoxOC40N3B4IDI2Ljk5cHgiIGQ9Ik0xOC40NyAyNi45OSBRMjMuNzMgMjcuNjMgMjguMDcgMjYuMTMiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuMjk7dHJhbnNmb3JtLW9yaWdpbjoxOS4wMHB4IDI2LjM0cHgiIGQ9Ik0xOS4wMCAyNi4zNCBRMjQuNDIgMjYuOTkgMjguODkgMjUuNDUiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuMzE7dHJhbnNmb3JtLW9yaWdpbjoxOS41NXB4IDI1LjcwcHgiIGQ9Ik0xOS41NSAyNS43MCBRMjMuNzEgMjYuOTUgMjcuNDIgMjYuMzYiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuMzM7dHJhbnNmb3JtLW9yaWdpbjoyMC4xMHB4IDI1LjA1cHgiIGQ9Ik0yMC4xMCAyNS4wNSBRMjQuMzQgMjYuMzMgMjguMTMgMjUuNzIiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuMzY7dHJhbnNmb3JtLW9yaWdpbjoyMC42NnB4IDI0LjQwcHgiIGQ9Ik0yMC42NiAyNC40MCBRMjYuNDcgMjUuMDggMzEuMjUgMjMuNDIiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuMzg7dHJhbnNmb3JtLW9yaWdpbjoyMS4yNHB4IDIzLjc1cHgiIGQ9Ik0yMS4yNCAyMy43NSBRMjcuMTQgMjQuNDQgMzIuMDAgMjIuNzUiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuNDA7dHJhbnNmb3JtLW9yaWdpbjoyMS44MnB4IDIzLjExcHgiIGQ9Ik0yMS44MiAyMy4xMSBRMjcuODEgMjMuODAgMzIuNzMgMjIuMDciLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuNDI7dHJhbnNmb3JtLW9yaWdpbjoyMi40MXB4IDIyLjQ2cHgiIGQ9Ik0yMi40MSAyMi40NiBRMjguNDcgMjMuMTUgMzMuNDUgMjEuNDAiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuNDQ7dHJhbnNmb3JtLW9yaWdpbjoyMy4wMXB4IDIxLjgxcHgiIGQ9Ik0yMy4wMSAyMS44MSBRMjkuMTIgMjIuNTAgMzQuMTUgMjAuNzMiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuNDc7dHJhbnNmb3JtLW9yaWdpbjoyMy42MnB4IDIxLjE3cHgiIGQ9Ik0yMy42MiAyMS4xNyBRMjkuNzggMjEuODUgMzQuODMgMjAuMDYiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuNDk7dHJhbnNmb3JtLW9yaWdpbjoyNC4yNHB4IDIwLjUycHgiIGQ9Ik0yNC4yNCAyMC41MiBRMzAuNDIgMjEuMjAgMzUuNDkgMTkuNDAiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuNTE7dHJhbnNmb3JtLW9yaWdpbjoyNC44N3B4IDE5Ljg3cHgiIGQ9Ik0yNC44NyAxOS44NyBRMzEuMDYgMjAuNTUgMzYuMTQgMTguNzMiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuNTM7dHJhbnNmb3JtLW9yaWdpbjoyNS41MXB4IDE5LjIzcHgiIGQ9Ik0yNS41MSAxOS4yMyBRMzEuNzAgMTkuODkgMzYuNzcgMTguMDciLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuNTY7dHJhbnNmb3JtLW9yaWdpbjoyNi4xNXB4IDE4LjU4cHgiIGQ9Ik0yNi4xNSAxOC41OCBRMzIuMzMgMTkuMjMgMzcuMzkgMTcuNDAiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuNTg7dHJhbnNmb3JtLW9yaWdpbjoyNi44MXB4IDE3Ljk0cHgiIGQ9Ik0yNi44MSAxNy45NCBRMzIuOTYgMTguNTcgMzcuOTggMTYuNzQiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuNjA7dHJhbnNmb3JtLW9yaWdpbjoyNy40OHB4IDE3LjMwcHgiIGQ9Ik0yNy40OCAxNy4zMCBRMzMuNTggMTcuOTEgMzguNTYgMTYuMDkiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuNjI7dHJhbnNmb3JtLW9yaWdpbjoyOC4xNXB4IDE2LjY1cHgiIGQ9Ik0yOC4xNSAxNi42NSBRMzIuNDggMTcuODYgMzYuMzEgMTcuMTciLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuNjQ7dHJhbnNmb3JtLW9yaWdpbjoyOC44NHB4IDE2LjAxcHgiIGQ9Ik0yOC44NCAxNi4wMSBRMzMuMTAgMTcuMTkgMzYuODYgMTYuNTAiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuNjc7dHJhbnNmb3JtLW9yaWdpbjoyOS41M3B4IDE1LjM2cHgiIGQ9Ik0yOS41MyAxNS4zNiBRMzUuNDAgMTUuOTIgNDAuMTggMTQuMTMiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuNjk7dHJhbnNmb3JtLW9yaWdpbjozMC4yNHB4IDE0LjcycHgiIGQ9Ik0zMC4yNCAxNC43MiBRMzUuOTkgMTUuMjUgNDAuNjcgMTMuNDgiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuNzE7dHJhbnNmb3JtLW9yaWdpbjozMC45NXB4IDE0LjA4cHgiIGQ9Ik0zMC45NSAxNC4wOCBRMzYuNTcgMTQuNTggNDEuMTQgMTIuODQiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuNzM7dHJhbnNmb3JtLW9yaWdpbjozMS42N3B4IDEzLjQ0cHgiIGQ9Ik0zMS42NyAxMy40NCBRMzcuMTUgMTMuOTEgNDEuNTkgMTIuMjEiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuNzY7dHJhbnNmb3JtLW9yaWdpbjozMi40MHB4IDEyLjc5cHgiIGQ9Ik0zMi40MCAxMi43OSBRMzcuNzEgMTMuMjQgNDIuMDAgMTEuNTgiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuNzg7dHJhbnNmb3JtLW9yaWdpbjozMy4xNXB4IDEyLjE1cHgiIGQ9Ik0zMy4xNSAxMi4xNSBRMzguMjUgMTIuNTcgNDIuMzkgMTAuOTYiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuODA7dHJhbnNmb3JtLW9yaWdpbjozMy45MHB4IDExLjUxcHgiIGQ9Ik0zMy45MCAxMS41MSBRMzguNzkgMTEuODkgNDIuNzQgMTAuMzQiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuODI7dHJhbnNmb3JtLW9yaWdpbjozNC42NnB4IDEwLjg3cHgiIGQ9Ik0zNC42NiAxMC44NyBRMzkuMzAgMTEuMjIgNDMuMDUgOS43MyIvPjxwYXRoIGNsYXNzPSJjcS1xYiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRjFFQ0RGIiBzdHJva2Utd2lkdGg9Ii44IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0eWxlPSItLXU6MC44NDt0cmFuc2Zvcm0tb3JpZ2luOjM1LjQzcHggMTAuMjNweCIgZD0iTTM1LjQzIDEwLjIzIFEzOS43OSAxMC41NCA0My4zMSA5LjE0Ii8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjg3O3RyYW5zZm9ybS1vcmlnaW46MzYuMjBweCA5LjU5cHgiIGQ9Ik0zNi4yMCA5LjU5IFE0MC4yNiA5Ljg3IDQzLjUyIDguNTUiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuODk7dHJhbnNmb3JtLW9yaWdpbjozNi45OXB4IDguOTVweCIgZD0iTTM2Ljk5IDguOTUgUTQwLjY5IDkuMTkgNDMuNjYgNy45OCIvPjxwYXRoIGNsYXNzPSJjcS1xYiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRjFFQ0RGIiBzdHJva2Utd2lkdGg9Ii44IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0eWxlPSItLXU6MC45MTt0cmFuc2Zvcm0tb3JpZ2luOjM3Ljc5cHggOC4zMXB4IiBkPSJNMzcuNzkgOC4zMSBRNDEuMDggOC41MSA0My43MyA3LjQzIi8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjkzO3RyYW5zZm9ybS1vcmlnaW46MzguNjBweCA3LjY3cHgiIGQ9Ik0zOC42MCA3LjY3IFE0MS40MiA3LjgzIDQzLjY3IDYuOTAiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuOTY7dHJhbnNmb3JtLW9yaWdpbjozOS40MXB4IDcuMDNweCIgZD0iTTM5LjQxIDcuMDMgUTQxLjY2IDcuMTUgNDMuNDYgNi40MCIvPjxwYXRoIGNsYXNzPSJjcS1xYiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRjFFQ0RGIiBzdHJva2Utd2lkdGg9Ii44IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0eWxlPSItLXU6MC45ODt0cmFuc2Zvcm0tb3JpZ2luOjQwLjI0cHggNi4zOXB4IiBkPSJNNDAuMjQgNi4zOSBRNDEuNzUgNi40NyA0Mi45NSA1Ljk2Ii8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjAyO3RyYW5zZm9ybS1vcmlnaW46MTMuMjBweCAzNC4xNXB4IiBkPSJNMTMuMjAgMzQuMTUgUTEyLjcwIDMzLjMwIDEyLjY0IDMyLjQ0Ii8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjA0O3RyYW5zZm9ybS1vcmlnaW46MTMuNjNweCAzMy41MHB4IiBkPSJNMTMuNjMgMzMuNTAgUTEyLjk2IDMyLjI5IDEyLjg5IDMxLjEwIi8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjA3O3RyYW5zZm9ybS1vcmlnaW46MTQuMDdweCAzMi44NHB4IiBkPSJNMTQuMDcgMzIuODQgUTEzLjI4IDMxLjM2IDEzLjIzIDI5LjkxIi8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjA5O3RyYW5zZm9ybS1vcmlnaW46MTQuNTJweCAzMi4xOXB4IiBkPSJNMTQuNTIgMzIuMTkgUTEzLjY1IDMwLjQ3IDEzLjYyIDI4LjgwIi8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjExO3RyYW5zZm9ybS1vcmlnaW46MTQuOThweCAzMS41NHB4IiBkPSJNMTQuOTggMzEuNTQgUTE0LjA1IDI5LjYxIDE0LjA1IDI3Ljc2Ii8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjEzO3RyYW5zZm9ybS1vcmlnaW46MTUuNDVweCAzMC44OXB4IiBkPSJNMTUuNDUgMzAuODkgUTE0LjQ4IDI4Ljc3IDE0LjUyIDI2Ljc1Ii8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjE2O3RyYW5zZm9ybS1vcmlnaW46MTUuOTNweCAzMC4yNHB4IiBkPSJNMTUuOTMgMzAuMjQgUTE0LjkzIDI3Ljk0IDE1LjAxIDI1Ljc4Ii8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjE4O3RyYW5zZm9ybS1vcmlnaW46MTYuNDJweCAyOS41OXB4IiBkPSJNMTYuNDIgMjkuNTkgUTE1LjQwIDI3LjEzIDE1LjUzIDI0LjgzIi8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjIwO3RyYW5zZm9ybS1vcmlnaW46MTYuOTJweCAyOC45NHB4IiBkPSJNMTYuOTIgMjguOTQgUTE1Ljg5IDI2LjMzIDE2LjA4IDIzLjkxIi8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjIyO3RyYW5zZm9ybS1vcmlnaW46MTcuNDJweCAyOC4yOXB4IiBkPSJNMTcuNDIgMjguMjkgUTE2LjQwIDI1LjU0IDE2LjY0IDIzLjAyIi8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjI0O3RyYW5zZm9ybS1vcmlnaW46MTcuOTRweCAyNy42NHB4IiBkPSJNMTcuOTQgMjcuNjQgUTE2LjkzIDI0Ljc3IDE3LjIzIDIyLjE1Ii8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjI3O3RyYW5zZm9ybS1vcmlnaW46MTguNDdweCAyNi45OXB4IiBkPSJNMTguNDcgMjYuOTkgUTE3LjQ4IDI0LjAwIDE3LjgzIDIxLjMwIi8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjI5O3RyYW5zZm9ybS1vcmlnaW46MTkuMDBweCAyNi4zNHB4IiBkPSJNMTkuMDAgMjYuMzQgUTE4LjA0IDIzLjI0IDE4LjQ2IDIwLjQ2Ii8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjMxO3RyYW5zZm9ybS1vcmlnaW46MTkuNTVweCAyNS43MHB4IiBkPSJNMTkuNTUgMjUuNzAgUTE4LjYxIDIyLjUwIDE5LjEwIDE5LjY1Ii8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjMzO3RyYW5zZm9ybS1vcmlnaW46MjAuMTBweCAyNS4wNXB4IiBkPSJNMjAuMTAgMjUuMDUgUTE5LjIwIDIxLjc2IDE5Ljc1IDE4Ljg2Ii8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjM2O3RyYW5zZm9ybS1vcmlnaW46MjAuNjZweCAyNC40MHB4IiBkPSJNMjAuNjYgMjQuNDAgUTE5LjgxIDIxLjAzIDIwLjQyIDE4LjA4Ii8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjM4O3RyYW5zZm9ybS1vcmlnaW46MjEuMjRweCAyMy43NXB4IiBkPSJNMjEuMjQgMjMuNzUgUTIwLjQzIDIwLjMxIDIxLjEwIDE3LjMzIi8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjQwO3RyYW5zZm9ybS1vcmlnaW46MjEuODJweCAyMy4xMXB4IiBkPSJNMjEuODIgMjMuMTEgUTIxLjA2IDE5LjYwIDIxLjgwIDE2LjU5Ii8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjQyO3RyYW5zZm9ybS1vcmlnaW46MjIuNDFweCAyMi40NnB4IiBkPSJNMjIuNDEgMjIuNDYgUTIxLjcxIDE4LjkwIDIyLjUwIDE1Ljg3Ii8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjQ0O3RyYW5zZm9ybS1vcmlnaW46MjMuMDFweCAyMS44MXB4IiBkPSJNMjMuMDEgMjEuODEgUTIyLjM2IDE4LjIxIDIzLjIyIDE1LjE2Ii8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjQ3O3RyYW5zZm9ybS1vcmlnaW46MjMuNjJweCAyMS4xN3B4IiBkPSJNMjMuNjIgMjEuMTcgUTIyLjcwIDE4LjUzIDIyLjk4IDE2LjEzIi8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjQ5O3RyYW5zZm9ybS1vcmlnaW46MjQuMjRweCAyMC41MnB4IiBkPSJNMjQuMjQgMjAuNTIgUTIzLjM2IDE3Ljg2IDIzLjY5IDE1LjQ2Ii8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjUxO3RyYW5zZm9ybS1vcmlnaW46MjQuODdweCAxOS44N3B4IiBkPSJNMjQuODcgMTkuODcgUTI0LjQwIDE2LjIwIDI1LjQyIDEzLjE2Ii8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjUzO3RyYW5zZm9ybS1vcmlnaW46MjUuNTFweCAxOS4yM3B4IiBkPSJNMjUuNTEgMTkuMjMgUTI1LjEwIDE1LjU1IDI2LjE4IDEyLjUzIi8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjU2O3RyYW5zZm9ybS1vcmlnaW46MjYuMTVweCAxOC41OHB4IiBkPSJNMjYuMTUgMTguNTggUTI1LjgxIDE0LjkxIDI2LjkzIDExLjkxIi8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjU4O3RyYW5zZm9ybS1vcmlnaW46MjYuODFweCAxNy45NHB4IiBkPSJNMjYuODEgMTcuOTQgUTI2LjUzIDE0LjI4IDI3LjcwIDExLjMyIi8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjYwO3RyYW5zZm9ybS1vcmlnaW46MjcuNDhweCAxNy4zMHB4IiBkPSJNMjcuNDggMTcuMzAgUTI3LjI2IDEzLjY2IDI4LjQ3IDEwLjc0Ii8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjYyO3RyYW5zZm9ybS1vcmlnaW46MjguMTVweCAxNi42NXB4IiBkPSJNMjguMTUgMTYuNjUgUTI4LjAwIDEzLjA1IDI5LjI0IDEwLjE4Ii8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjY0O3RyYW5zZm9ybS1vcmlnaW46MjguODRweCAxNi4wMXB4IiBkPSJNMjguODQgMTYuMDEgUTI4Ljc0IDEyLjQ1IDMwLjAxIDkuNjQiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuNjc7dHJhbnNmb3JtLW9yaWdpbjoyOS41M3B4IDE1LjM2cHgiIGQ9Ik0yOS41MyAxNS4zNiBRMjkuNTAgMTEuODYgMzAuNzkgOS4xMiIvPjxwYXRoIGNsYXNzPSJjcS1xYiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRjFFQ0RGIiBzdHJva2Utd2lkdGg9Ii44IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0eWxlPSItLXU6MC42OTt0cmFuc2Zvcm0tb3JpZ2luOjMwLjI0cHggMTQuNzJweCIgZD0iTTMwLjI0IDE0LjcyIFEzMC4yNiAxMS4yOCAzMS41NyA4LjYyIi8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjcxO3RyYW5zZm9ybS1vcmlnaW46MzAuOTVweCAxNC4wOHB4IiBkPSJNMzAuOTUgMTQuMDggUTMxLjAyIDEwLjcyIDMyLjM1IDguMTQiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuNzM7dHJhbnNmb3JtLW9yaWdpbjozMS42N3B4IDEzLjQ0cHgiIGQ9Ik0zMS42NyAxMy40NCBRMzEuNzkgMTAuMTcgMzMuMTIgNy42OCIvPjxwYXRoIGNsYXNzPSJjcS1xYiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRjFFQ0RGIiBzdHJva2Utd2lkdGg9Ii44IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0eWxlPSItLXU6MC43Njt0cmFuc2Zvcm0tb3JpZ2luOjMyLjQwcHggMTIuNzlweCIgZD0iTTMyLjQwIDEyLjc5IFEzMi41NyA5LjYzIDMzLjkwIDcuMjQiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuNzg7dHJhbnNmb3JtLW9yaWdpbjozMy4xNXB4IDEyLjE1cHgiIGQ9Ik0zMy4xNSAxMi4xNSBRMzMuMzYgOS4xMSAzNC42NyA2LjgyIi8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjgwO3RyYW5zZm9ybS1vcmlnaW46MzMuOTBweCAxMS41MXB4IiBkPSJNMzMuOTAgMTEuNTEgUTM0LjE0IDguNjAgMzUuNDMgNi40NCIvPjxwYXRoIGNsYXNzPSJjcS1xYiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRjFFQ0RGIiBzdHJva2Utd2lkdGg9Ii44IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0eWxlPSItLXU6MC44Mjt0cmFuc2Zvcm0tb3JpZ2luOjM0LjY2cHggMTAuODdweCIgZD0iTTM0LjY2IDEwLjg3IFEzNC45MyA4LjExIDM2LjE5IDYuMDciLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuODQ7dHJhbnNmb3JtLW9yaWdpbjozNS40M3B4IDEwLjIzcHgiIGQ9Ik0zNS40MyAxMC4yMyBRMzUuNzMgNy42NCAzNi45NCA1Ljc0Ii8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjg3O3RyYW5zZm9ybS1vcmlnaW46MzYuMjBweCA5LjU5cHgiIGQ9Ik0zNi4yMCA5LjU5IFEzNi41MiA3LjE5IDM3LjY3IDUuNDUiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuODk7dHJhbnNmb3JtLW9yaWdpbjozNi45OXB4IDguOTVweCIgZD0iTTM2Ljk5IDguOTUgUTM3LjMyIDYuNzcgMzguMzkgNS4xOSIvPjxwYXRoIGNsYXNzPSJjcS1xYiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRjFFQ0RGIiBzdHJva2Utd2lkdGg9Ii44IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0eWxlPSItLXU6MC45MTt0cmFuc2Zvcm0tb3JpZ2luOjM3Ljc5cHggOC4zMXB4IiBkPSJNMzcuNzkgOC4zMSBRMzguMTEgNi4zNyAzOS4wOSA0Ljk4Ii8+PHBhdGggY2xhc3M9ImNxLXFiIiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUVDREYiIHN0cm9rZS13aWR0aD0iLjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3R5bGU9Ii0tdTowLjkzO3RyYW5zZm9ybS1vcmlnaW46MzguNjBweCA3LjY3cHgiIGQ9Ik0zOC42MCA3LjY3IFEzOC44OSA2LjAxIDM5Ljc1IDQuODQiLz48cGF0aCBjbGFzcz0iY3EtcWIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRUNERiIgc3Ryb2tlLXdpZHRoPSIuOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHlsZT0iLS11OjAuOTY7dHJhbnNmb3JtLW9yaWdpbjozOS40MXB4IDcuMDNweCIgZD0iTTM5LjQxIDcuMDMgUTM5LjY3IDUuNzEgNDAuMzcgNC43OSIvPjxwYXRoIGNsYXNzPSJjcS1xYiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRjFFQ0RGIiBzdHJva2Utd2lkdGg9Ii44IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0eWxlPSItLXU6MC45ODt0cmFuc2Zvcm0tb3JpZ2luOjQwLjI0cHggNi4zOXB4IiBkPSJNNDAuMjQgNi4zOSBRNDAuNDIgNS41MSA0MC45MCA0Ljg5Ii8+PHBhdGggY2xhc3M9ImNxLXFzIiBmaWxsPSIjRDhEMEJDIiBkPSJNOS40NiA0Mi43MSBMOS44OSA0MS43NyBMMTAuMzQgNDAuODQgTDEwLjgxIDM5LjkwIEwxMS4zMCAzOC45NyBMMTEuODAgMzguMDMgTDEyLjMzIDM3LjEwIEwxMi44OCAzNi4xNiBMMTMuNDQgMzUuMjMgTDE0LjAzIDM0LjI5IEwxNC42NCAzMy4zNiBMMTUuMjYgMzIuNDIgTDE1LjkxIDMxLjQ5IEwxNi41NyAzMC41NSBMMTcuMjUgMjkuNjEgTDE3Ljk2IDI4LjY4IEwxOC42OCAyNy43NCBMMTkuNDIgMjYuODEgTDIwLjE4IDI1Ljg3IEwyMC45NyAyNC45MyBMMjEuNzcgMjQuMDAgTDIyLjU5IDIzLjA2IEwyMy40MyAyMi4xMyBMMjQuMjkgMjEuMTkgTDI1LjE3IDIwLjI2IEwyNi4wNyAxOS4zMiBMMjYuOTkgMTguMzkgTDI3LjkyIDE3LjQ1IEwyOC44OCAxNi41MiBMMjkuODYgMTUuNTkgTDMwLjg2IDE0LjY1IEwzMS44NyAxMy43MiBMMzIuOTEgMTIuNzkgTDMzLjk3IDExLjg1IEwzNS4wNCAxMC45MiBMMzYuMTQgOS45OSBMMzcuMjUgOS4wNiBMMzguMzggOC4xMyBMMzkuNTQgNy4yMCBMNDAuNzEgNi4yNyBMNDEuOTAgNS4zNCBMNDEuNzAgNS4wNiBMNDAuNDggNS45NiBMMzkuMjggNi44NyBMMzguMTAgNy43NyBMMzYuOTQgOC42NyBMMzUuODAgOS41OCBMMzQuNjcgMTAuNDggTDMzLjU3IDExLjM5IEwzMi40OCAxMi4yOSBMMzEuNDIgMTMuMjAgTDMwLjM3IDE0LjExIEwyOS4zNCAxNS4wMiBMMjguMzMgMTUuOTMgTDI3LjM0IDE2Ljg0IEwyNi4zNyAxNy43NSBMMjUuNDEgMTguNjcgTDI0LjQ4IDE5LjU4IEwyMy41NiAyMC41MCBMMjIuNjcgMjEuNDEgTDIxLjc5IDIyLjMzIEwyMC45MyAyMy4yNSBMMjAuMDkgMjQuMTcgTDE5LjI3IDI1LjA5IEwxOC40NyAyNi4wMiBMMTcuNjkgMjYuOTQgTDE2LjkyIDI3Ljg2IEwxNi4xOCAyOC43OSBMMTUuNDUgMjkuNzIgTDE0Ljc1IDMwLjY0IEwxNC4wNiAzMS41NyBMMTMuMzkgMzIuNTEgTDEyLjc0IDMzLjQ0IEwxMi4xMSAzNC4zNyBMMTEuNTAgMzUuMzEgTDEwLjkwIDM2LjI0IEwxMC4zMyAzNy4xOCBMOS43NyAzOC4xMiBMOS4yNCAzOS4wNiBMOC43MiA0MC4wMCBMOC4yMiA0MC45NSBMNy43NCA0MS44OVoiLz48cGF0aCBjbGFzcz0iY3EtcW4iIGZpbGw9IiNENEIxNzMiIGQ9Ik05LjUwIDQyLjczIEw2LjgwIDQ2LjEwIEw3LjcwIDQxLjg3IFoiLz48bGluZSBjbGFzcz0iY3Etc2xpdCIgc3Ryb2tlPSIjMEQxRjE2IiBzdHJva2Utd2lkdGg9Ii4zNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiB4MT0iNy4xMCIgeTE9IjQ1LjQ2IiB4Mj0iNy45MiIgeTI9IjQzLjc1Ii8+PC9zdmc+Cg==';
let portalEl = null;
/* dialogs, toasts and popovers sit at the end of <body>, inside .hzx so its styles reach them */
const portal = () => { if (!portalEl || !portalEl.isConnected) { portalEl = document.createElement('div'); portalEl.className = 'hzx hzx-portal'; document.body.append(portalEl); } return portalEl; };
const h = (tag, attrs, ...kids) => {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v; else if (k === 'html') el.innerHTML = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v); else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of kids.flat()) if (c != null && c !== false) el.append(c.nodeType ? c : document.createTextNode(String(c)));
  return el;
};
const svg = (d, vb = '0 0 16 16') => `<svg viewBox="${vb}" aria-hidden="true">${d}</svg>`;
const NOW = new Date();
const daysTo = (iso) => Math.round((new Date(iso + 'T12:00:00') - NOW) / 864e5);
const PEOPLE = { 'Roger Bennett': ['RB', ''], 'Grace Coleman': ['GC', 'g'], 'Matt Rivera': ['MR', 'm'] };
const face = (n) => h('span', { class: 'face ' + PEOPLE[n][1], 'aria-hidden': 'true' }, PEOPLE[n][0]);
const who = (n) => h('span', { class: 'who' }, face(n), n);
const back = () => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>';
let toastEl, toastT;
function toast(msg, act) {
  if (typeof pbToast === 'function') return pbToast(msg, act);   /* Clavia's toast, so it looks and stacks like every other */
  toastEl?.remove(); clearTimeout(toastT);
  toastEl = h('div', { class: 'toast', role: 'status' }, h('span', {}, msg), act && h('button', { type: 'button', onclick: () => { toastEl?.remove(); act.run(); } }, act.label));
  portal().append(toastEl); toastT = setTimeout(() => toastEl?.remove(), act ? 6000 : 3200);
}
function dialog(title, body, foot) {
  const dim = h('div', { class: 'pb-dim', onclick: (e) => { if (e.target === dim) close(); } });
  const close = () => { dim.remove(); removeEventListener('keydown', onKey, true); };
  const onKey = (e) => { if (e.key === 'Escape' && !document.querySelector('.mx-fpop')) { e.stopPropagation(); close(); } };
  dim.append(h('div', { class: 'pb-dlg', role: 'dialog', 'aria-modal': 'true', 'aria-label': title },
    h('header', { class: 'mx-rqf-head' }, h('h2', { class: 'pb-dlg-t' }, title)), h('div', { class: 'mx-rqf-body' }, ...body), h('footer', { class: 'mx-rqf-foot' }, ...foot(close))));
  portal().append(dim); addEventListener('keydown', onKey, true); setTimeout(() => dim.querySelector('.pb-btn')?.focus(), 0);
}

function paintRail() {}

/* ── HZ-231, from Clavia's Horizon seed. Every document it touches, with a priority from one rule (below). ── */
const STAGE = { paper: 'Our paper', neg: 'In negotiation', signed: 'Signed' };
/* priority as Clavia writes it where it is worked out rather than typed (the Do list): High, Medium, Low.
   The keys stay as the rule names them: urgent → High, high → Medium. */
const PRIO = { urgent: ['High', 3], high: ['Medium', 2], low: ['Low', 1] };
const VERDICT = { bad: 'Conflict', gap: 'Gap', ok: 'Compliant' };
const prio = (k, sub) => h('span', {}, h('span', { class: 'pr ' + k }, PRIO[k][0]), sub ? h('span', { class: 'pr-d tn' }, sub) : null);

/* ── the documents each update touches: Clavia's own ──
   Every row is a document that exists elsewhere in Clavia, and every quote is its actual wording:
   ref says where it lives (an Intake request's document, a template, a playbook clause, a Vault file),
   find is the words Horizon marks in it. q(lead, the words, rest) quotes them with the words marked. */
const q = (pre, mark, post = '') => [h => h('b', {}, pre), h => h('mark', {}, mark), post];
let ROWS = [
  { id: 'trellis', issue: "Clause 6.1 lets Trellis leave after year one only by paying 25% of the remaining fees. From 12 January 2027 that is a switching charge, which we can’t ask for.", name: 'Trellis Health – Order Form', sub: 'Intake · RQ-1042 · first draft', type: 'Order form', stage: 'neg', verdict: 'bad', prio: 'urgent', by: '2026-11-06',
    next: 'Take the 25% termination fee out of 6.1 before it is signed',
    ref: { kind: 'request', id: 'RQ-1042', doc: 'd1' }, find: 'on payment of a termination fee equal to 25% of the fees that would have been payable for the remainder of the Initial Subscription Term',
    quote: [h => h('b', {}, '6.1 '), 'Customer may terminate the Subscription for convenience at the end of the first subscription year by giving at least 90 days\' written notice, ', h => h('mark', {}, 'on payment of a termination fee equal to 25% of the fees that would have been payable for the remainder of the Initial Subscription Term'), '.'], cite: 'Order Form · clause 6.1' },
  { id: 'acme', issue: "Acme can already leave on 30 days’ notice, so the notice period is fine. Nothing helps them take their data out or move to another provider.", name: 'Acme Corp – MSA v3', sub: 'Intake · RQ-1047 · Acme’s redline', type: 'Redline', stage: 'neg', verdict: 'gap', prio: 'high',
    next: 'Add data export and help to switch in our next turn',
    ref: { kind: 'request', id: 'RQ-1047', doc: 'd1' }, find: 'Customer may also terminate this Agreement for convenience at any time on thirty (30) days’ written notice',
    quote: q('5. Termination. ', 'Customer may also terminate this Agreement for convenience at any time on thirty (30) days’ written notice', ', and Provider will refund any prepaid fees for the remainder of the Subscription Term.'), cite: 'MSA v3 · clause 5' },
  { id: 'harbor', issue: "Clause 6 lets us delete Harbor’s data instead of handing it back. Harbor must be able to take its data out first, at no charge.", name: 'Harbor Retail – DPA', sub: 'Intake · RQ-1043 · Harbor’s redline', type: 'Redline', stage: 'neg', verdict: 'gap', prio: 'high',
    next: 'Let Harbor choose to take its data out, at no charge, before deletion',
    ref: { kind: 'request', id: 'RQ-1043', doc: 'd1' }, find: 'Within thirty (30) days after the Services end, Processor will delete or return Customer Personal Data',
    quote: q('6. Deletion of Data. ', 'Within thirty (30) days after the Services end, Processor will delete or return Customer Personal Data', ' and, on request, certify the deletion in writing.'), cite: 'DPA · clause 6' },
  { id: 'msa-short', issue: "Customers can only leave for breach. Every new deal on this template would miss the right to switch on two months’ notice.", name: 'Master Services Agreement — short form', sub: 'Templates · v3', type: 'Template', stage: 'paper', verdict: 'gap', prio: 'high',
    next: 'Add switching: two months’ notice, a 30-day transition, no charge',
    ref: { kind: 'template', id: 'msa-short' }, find: 'Either party may terminate for the other’s material breach that is not cured within 30 days of notice.',
    quote: q('Termination. ', 'Either party may terminate for the other’s material breach that is not cured within 30 days of notice.'), cite: 'Template v3 · Termination' },
  { id: 'saas-pb', issue: "The starting position refuses termination for convenience, so reviews would push back on a right customers now have.", name: 'SaaS subscription agreement', sub: 'Playbooks · Termination · v4', type: 'Playbook', stage: 'paper', verdict: 'bad', prio: 'high',
    next: 'Change the starting position before the next deal',
    ref: { kind: 'playbook', id: 'saas', clause: 'termination' }, find: 'No termination for convenience.',
    quote: q('Starting position. ', 'Either party may terminate for the other party\'s material breach that is not cured within 30 days of notice. No termination for convenience.'), cite: 'Playbook v4 · Termination' },
  { id: 'brightline', issue: "Here we are the customer. Brightline must help us move our data and, from 12 January 2027, can’t charge for it.", name: 'Brightline – Notice of Non-renewal', sub: 'Intake · RQ-1045 · we are the customer', type: 'Notice', stage: 'paper', verdict: 'ok', prio: 'low',
    next: 'Ask Brightline to help with the move at no charge',
    ref: { kind: 'request', id: 'RQ-1045', doc: 'd1' }, find: 'Brightline is required to provide reasonable assistance with the orderly migration of Lumen\'s data and workloads before expiry',
    quote: q('', 'Under clause 13.3 of the Agreement, Brightline is required to provide reasonable assistance with the orderly migration of Lumen\'s data and workloads before expiry', ', and to return or securely delete all Lumen data within 30 days afterwards.'), cite: 'Notice · paragraph 2' },
  /* the same law in the Vault: the files Lumen keeps for these customers and suppliers, read from their Vault summary */
  { id: 'acme-of', party: 'Acme Corp', issue: "A 36-month term with fees paid a year ahead. Nothing says what Acme gets back if it switches provider on two months’ notice.", name: 'Order Form – Platform subscription', sub: 'Vault · Acme Corp — MSA negotiation', type: 'Order form', stage: 'neg', verdict: 'gap', prio: 'high',
    next: 'Say what happens to prepaid fees if Acme switches early',
    ref: { kind: 'vault', id: 'acme-msa', file: 'Order Form – Platform subscription.pdf' }, find: '36-month term, fees invoiced annually in advance',
    quote: q('', 'The commercial terms: 450 seats, a 36-month term, fees invoiced annually in advance.'), cite: 'Vault · Term' },
  { id: 'acme-dpa', party: 'Acme Corp', issue: "Our standard DPA, which lets us delete Acme’s data at the end instead of first letting Acme take it out.", name: 'Data Processing Addendum – Acme', sub: 'Vault · Acme Corp — MSA negotiation', type: 'Addendum', stage: 'neg', verdict: 'gap', prio: 'high',
    next: 'Use the fixed deletion clause in the version that goes back to Acme',
    ref: { kind: 'vault', id: 'acme-msa', file: 'Data Processing Addendum – Acme.docx' }, find: 'unchanged from the standard',
    quote: q('', 'Our Data Processing Addendum, unchanged from the standard except for Acme’s named subprocessor contact.'), cite: 'Vault · Deletion of data' },
  { id: 'trellis-dpa', party: 'Trellis Health', issue: "Signed on our standard terms, so the same deletion clause applies. A signed DPA only changes if Trellis agrees.", name: 'Trellis – DPA (signed)', sub: 'Vault · Customer DPAs', type: 'Addendum', stage: 'signed', verdict: 'gap', prio: 'urgent',
    next: 'Agree with Trellis: export first, then deletion',
    ref: { kind: 'vault', id: 'customer-dpas', file: 'Trellis – DPA (signed).pdf' }, find: 'Signed on our standard terms.',
    quote: q('', 'Signed on our standard terms.'), cite: 'Vault · Deletion of data' },
  { id: 'sentinel-dpa', party: 'Sentinel Health', issue: "Signed with one change that has nothing to do with exit, so our standard deletion clause applies.", name: 'Sentinel Health – DPA (signed)', sub: 'Vault · Customer DPAs', type: 'Addendum', stage: 'signed', verdict: 'gap', prio: 'urgent',
    next: 'Agree with Sentinel: export first, then deletion',
    ref: { kind: 'vault', id: 'customer-dpas', file: 'Sentinel Health – DPA (signed).pdf' }, find: 'Signed with one change',
    quote: q('', 'Signed with one change: special category data permitted in named fields.'), cite: 'Vault · Deletion of data' },
  { id: 'brightpath-dpa', party: 'Brightpath', issue: "Signed on our standard terms, so the same deletion clause applies. A signed DPA only changes if Brightpath agrees.", name: 'Brightpath – DPA (signed)', sub: 'Vault · Customer DPAs', type: 'Addendum', stage: 'signed', verdict: 'gap', prio: 'urgent',
    next: 'Agree with Brightpath: export first, then deletion',
    ref: { kind: 'vault', id: 'customer-dpas', file: 'Brightpath – DPA (signed).pdf' }, find: 'Signed on our standard terms.',
    quote: q('', 'Signed on our standard terms.'), cite: 'Vault · Deletion of data' },
  { id: 'bl-order4', party: 'Brightline Hosting Ltd', issue: "Here we are the customer. The higher committed spend is not a charge for leaving, so nothing changes for us.", name: 'Brightline Hosting – Order #4 (capacity)', sub: 'Vault · Supplier agreements 2026 · we are the customer', type: 'Order form', stage: 'signed', verdict: 'ok', prio: 'low',
    next: 'No change: keep it in mind if we move off Brightline',
    ref: { kind: 'vault', id: 'suppliers-2026', file: 'Brightline Hosting – Order #4 (capacity).pdf' }, find: 'raises committed spend from January',
    quote: q('', 'Adds two regions and raises committed spend from January.'), cite: 'Vault · Committed spend' },
];
const overall = () => ROWS.some(r => r.prio === 'urgent' && !r.done) ? 'urgent' : ROWS.some(r => r.prio === 'high' && !r.done) ? 'high' : 'low';

const IMPACT = {
  'HZ-231': { rows: ROWS, src: 'EUR-Lex', stage: 'In force', lede: 'From 12 January 2027 a cloud provider may not charge a customer anything for switching to another provider or taking its data out. Trellis Health’s order form charges 25% to leave early, and neither our MSA nor our playbook gives a customer the right to switch.' },
  'HZ-236': { src: 'UAE Data Office', stage: 'Published', lede: 'Transfers out of the UAE need a contract with set protections where there is no adequacy decision. Our Gulf reseller terms are still in draft, so they can be fixed before anyone signs.', rows: [
    { id: 'g-draft', issue: "Clause 9 only says each party follows its own data law. It says nothing about moving personal data out of the UAE.", name: 'Gulf Systems – Reseller Agreement', sub: 'Intake · RQ-1044 · first draft', type: 'Draft', stage: 'paper', verdict: 'gap', prio: 'high', next: 'Add transfer terms to clause 9 before it goes to Gulf Systems',
      ref: { kind: 'request', id: 'RQ-1044', doc: 'd1' }, find: 'Each party shall comply with the data protection laws that apply to it',
      quote: q('9.1 ', 'Each party shall comply with the data protection laws that apply to it', ', including Federal Decree-Law No. 45 of 2021 of the United Arab Emirates and the Personal Data Protection Law of the Kingdom of Saudi Arabia.'), cite: 'Reseller Agreement · clause 9.1' },
    { id: 'g-tpl', issue: "The end-customer terms say nothing about transfers out of the UAE, so every reseller deal would start without them.", name: 'Reseller Agreement', sub: 'Templates · v1', type: 'Template', stage: 'paper', verdict: 'gap', prio: 'high', next: 'Add transfer protections for end customers',
      ref: { kind: 'template', id: 'reseller' }, find: 'Reseller will make sure each end customer accepts our standard terms before it is given access.',
      quote: q('End Customer Terms. ', 'Reseller will make sure each end customer accepts our standard terms before it is given access.'), cite: 'Template v1 · End Customer Terms' }] },
  'HZ-238': { src: 'legislation.gov.uk', stage: 'Made', lede: 'Recognised legitimate interests and the new complaints duty start on 1 December 2026. As a processor, the duty sits with customers; our DPA should say we help them with it.', rows: [
    { id: 'u-dpa', issue: "The DPA says we act on instructions, but not that we help customers answer complaints, which they will now ask us for.", name: 'Data Processing Addendum', sub: 'Templates · v2', type: 'Template', stage: 'paper', verdict: 'gap', prio: 'low', next: 'Say we help customers answer complaints',
      ref: { kind: 'template', id: 'dpa' }, find: 'We process it only on Customer’s documented instructions.',
      quote: q('Roles. ', 'Customer is the controller of Customer Personal Data and we are its processor. We process it only on Customer’s documented instructions.'), cite: 'Template v2 · Roles' },
    { id: 'u-pb', issue: "Our position already has us pass requests to the customer and give them the tools to answer. That covers complaints too.", name: 'Data processing addendum', sub: 'Playbooks · Data subject requests · v3', type: 'Playbook', stage: 'paper', verdict: 'ok', prio: 'low', next: 'Record the check',
      ref: { kind: 'playbook', id: 'dpa', clause: 'data-subject-requests' }, find: 'forward any request we receive without replying to it',
      quote: q('Starting position. ', 'We give Customer the tools to answer requests itself and forward any request we receive without replying to it.'), cite: 'Playbook v3 · Data subject requests' }] },
  'HZ-237': { src: 'EU AI Office', stage: 'Consultation', lede: 'The Commission’s draft guidelines explain Article 50 marking. Our DPA playbook already limits how we use customer data for AI; nothing changes until the guidelines are final.', rows: [
    { id: 'a-pb', issue: "Our position already rules out training on customer data. Nothing in the draft guidelines changes that.", name: 'Data processing addendum', sub: 'Playbooks · Use of data for AI · v3', type: 'Playbook', stage: 'paper', verdict: 'ok', prio: 'low', next: 'Recheck when the guidelines are final',
      ref: { kind: 'playbook', id: 'dpa', clause: 'ai-use' }, find: 'We do not use Customer Personal Data to train models for other customers.',
      quote: q('Starting position. ', 'We do not use Customer Personal Data to train models for other customers.', ' We may use aggregated, de-identified usage data to run and improve the Services.'), cite: 'Playbook v3 · Use of data for AI' }] },
  'HZ-233': { src: 'ICO', stage: 'Consultation', lede: 'The ICO proposes a simpler transfer risk assessment. Our DPA and Harbor Retail’s redline both rely on the Standard Contractual Clauses, which still work; nothing changes until the guidance is final.', rows: [
    { id: 'i-harbor', issue: "Harbor’s DPA relies on the Standard Contractual Clauses, which still work under the ICO’s proposal.", name: 'Harbor Retail – DPA', sub: 'Intake · RQ-1043 · Harbor’s redline', type: 'Redline', stage: 'neg', verdict: 'ok', prio: 'low', next: 'Recheck after 28 Nov',
      ref: { kind: 'request', id: 'RQ-1043', doc: 'd1' }, find: 'the Standard Contractual Clauses apply and are incorporated into this DPA',
      quote: q('5. International Transfers. ', 'Where Customer Personal Data is transferred outside the EEA or the UK, the Standard Contractual Clauses apply and are incorporated into this DPA.'), cite: 'DPA · clause 5' },
    { id: 'i-dpa', issue: "Our DPA relies on the Standard Contractual Clauses, which still work under the ICO’s proposal.", name: 'Data Processing Addendum', sub: 'Templates · v2', type: 'Template', stage: 'paper', verdict: 'ok', prio: 'low', next: 'Recheck after 28 Nov',
      ref: { kind: 'template', id: 'dpa' }, find: 'Transfers outside it are made under the Standard Contractual Clauses.',
      quote: q('Location and Transfers. ', 'Transfers outside it are made under the Standard Contractual Clauses.'), cite: 'Template v2 · Location and Transfers' }] },
  'HZ-234': { src: 'California Privacy Protection Agency', stage: 'Adopted', lede: 'Automated decision-making duties apply from January 2027. We don’t make the decisions, but US customers using our forecasts in credit decisions will ask what we provide.', rows: [
    { id: 'c-dpa', issue: "The DPA says nothing about automated decisions. Customers using our forecasts in credit decisions will need information from us for their notices.", name: 'Data Processing Addendum', sub: 'Templates · v2', type: 'Template', stage: 'paper', verdict: 'gap', prio: 'high', next: 'Add an optional clause on automated decisions',
      ref: { kind: 'template', id: 'dpa' }, find: 'Customer is the controller of Customer Personal Data and we are its processor.',
      quote: q('Roles. ', 'Customer is the controller of Customer Personal Data and we are its processor.', ' Silent on automated decisions.'), cite: 'Template v2 · Roles' }] },
  'HZ-229': { src: 'EUR-Lex', stage: 'In force', lede: 'Financial entities keep a register of ICT contracts. Our DPA’s security and subprocessor terms give banks the details the register needs.', rows: [
    { id: 'd-dpa', issue: "Our subprocessor terms already give banks what the register asks for.", name: 'Data Processing Addendum', sub: 'Templates · v2', type: 'Template', stage: 'paper', verdict: 'ok', prio: 'low', next: 'Checked 2 Oct', done: true,
      ref: { kind: 'template', id: 'dpa' }, find: 'Customer authorises our subprocessors as listed on our website.',
      quote: q('Subprocessors. ', 'Customer authorises our subprocessors as listed on our website.', ' We give 30 days’ notice of a new one.'), cite: 'Template v2 · Subprocessors' }] },
  'HZ-243': { src: 'gov.ie', stage: 'Bill', lede: 'Ireland’s bill puts pay ranges in job ads, bans pay-history questions and starts gap reporting in June 2027 for employers with 150+ staff. Our employment papers are for the UK only, so nothing changes yet.', rows: [
    { id: 'p-uk', issue: "A UK contract. The Directive doesn’t reach it.", name: 'Employment contract – UK (2026)', sub: 'Vault · Employment and HR policies', type: 'Agreement', stage: 'paper', verdict: 'ok', prio: 'low', next: 'No change: the Directive doesn’t cover the UK',
      ref: { kind: 'vault', id: 'employment', file: 'Employment contract – UK (2026).docx' }, find: '',
      quote: q('', 'The standard UK employment contract, with the updated notice periods.'), cite: 'Vault · file summary' }] },
};

/* ── the work on each document, and everything that happened to an update ──
   A document is open or completed, and assigned to one person in legal (Intake's picker); one
   deleted from an update keeps its data (for Undo) and leaves every list. ROWS is the update's
   documents. Every assignment, status change, priority change, due date, question and comment
   goes in the update's activity, newest first, as Intake keeps a request's. */
const ME = () => (typeof USER !== 'undefined' && USER.name) || 'Roger Bennett';
const allRows = (id = state.impact) => (IMPACT[id]?.rows || []).filter(r => !r.removed);
function useImpact(id) { const was = state.impact; state.impact = UPDATES.some(u => u.id === id) ? id : 'HZ-231'; if (state.impact !== was) state.dtab = 'open'; ROWS = allRows(); }
const refreshRows = () => { ROWS = allRows(); };
const SEED_ASSIGN = { trellis: 'Matt Rivera', acme: 'Grace Coleman', harbor: 'Grace Coleman', 'i-harbor': 'Grace Coleman', 'g-draft': 'Roger Bennett', 'd-dpa': 'Grace Coleman', 'msa-short': 'Roger Bennett', 'c-dpa': 'Roger Bennett', 'acme-of': 'Grace Coleman', 'acme-dpa': 'Grace Coleman', 'trellis-dpa': 'Matt Rivera' };
for (const I of Object.values(IMPACT)) for (const r of I.rows) { r.assignee = SEED_ASSIGN[r.id] || null; r.st = r.done ? 'done' : 'open'; }
/* due by default: two weeks before the law applies (the day itself when that is closer than three weeks) */
const lawDue = (u) => { if (!u?.next) return undefined; const d = new Date(u.next + 'T12:00:00'), t = new Date(); const b = new Date(d); b.setDate(d.getDate() - 14);
  const x = (b - t) / 864e5 >= 7 ? b : d; return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`; };
function seedUpdate(u) { for (const r of IMPACT[u.id]?.rows || []) { if (r.st === 'open' && !r.by && r.verdict !== 'ok') r.by = lawDue(u); } }
const ago = (d, hh = 9, mm = 0) => { const t = new Date(); t.setDate(t.getDate() - d); t.setHours(hh, mm, 0, 0); return t.toISOString(); };
const ACT = {};
function actOf(u) {
  if (ACT[u.id]) return ACT[u.id];
  const n = allRows(u.id).length;
  const a = [{ who: 'Clavia', what: `found this on ${u.src}`, when: ago(u.days, 8, 12) },
    { who: 'Clavia', what: n ? `checked ${n} ${n === 1 ? 'document' : 'documents'} against it` : 'checked our documents; nothing is touched', when: ago(u.days, 8, 14) }];
  if (u.id === 'HZ-231') a.push(
    { who: 'Grace Coleman', what: 'assigned', refs: ['trellis'], to: 'Matt Rivera', when: ago(5, 10, 30) },
    { who: 'Grace Coleman', what: 'assigned', refs: ['acme', 'harbor'], to: 'Grace Coleman', when: ago(5, 10, 32) },
    { who: 'Matt Rivera', what: 'commented on', refs: ['trellis'], text: 'Trellis wants to sign next week. I’ll take the 25% fee out of 6.1 before it goes; they have not asked for it.', when: ago(2, 16, 5) });
  if (u.id === 'HZ-229') a.push({ who: 'Grace Coleman', what: 'marked as done', refs: ['d-dpa'], when: ago(24, 11, 0) });
  return ACT[u.id] = a;
}
function log(u, a) { actOf(u).push({ who: ME(), when: new Date().toISOString(), ...a }); saveWork(); }
function saveWork() { try { localStorage.setItem('clavia-ri-work', JSON.stringify({ act: ACT, ups: Object.fromEntries(UPDATES.map(u => [u.id, { st: u.st, why: u.why || null, archBy: u.archBy || null, preArch: u.preArch || null, unread: !!u.unread }])), rows: Object.fromEntries(Object.values(IMPACT).flatMap(I => I.rows).map(r => [r.id, { assignee: r.assignee, st: r.st, by: r.by || null, proof: r.proof || null, removed: !!r.removed }])) })); } catch (e) {} }
try { const W = JSON.parse(localStorage.getItem('clavia-ri-work') || 'null'); if (W) {
  Object.assign(ACT, W.act || {});
  for (const r of Object.values(IMPACT).flatMap(I => I.rows)) { const v = W.rows?.[r.id];
    if (v && !Array.isArray(v)) { Object.assign(r, { assignee: v.assignee ?? null, st: v.st === 'done' ? 'done' : 'open', by: v.by || undefined, proof: v.proof || null, removed: !!v.removed }); r.done = r.st === 'done'; } } } } catch (e) {}
const docName = (id) => { const r = Object.values(IMPACT).flatMap(I => I.rows).find(x => x.id === id); return r ? shortN(r) : id; };
const whereOf = (r) => ({ request: `Intake ${r.ref?.id}`, template: 'Templates', playbook: 'Playbooks', vault: 'Vault' })[r.ref?.kind] || r.sub.split(' · ')[0];
const many = (rows) => rows.length === 1 ? shortN(rows[0]) : `${rows.length} documents`;

/* assign, complete, reopen, due date: one document or many, each with Undo and a line in the activity */
function assignDocs(rows, name) {
  const u = UPDATES.find(x => x.id === state.impact), was = rows.map(r => r.assignee);
  rows.forEach(r => { r.assignee = name; }); state.sel = new Set();
  log(u, name ? { what: 'assigned', refs: rows.map(r => r.id), to: name } : { what: 'unassigned', refs: rows.map(r => r.id) });
  paint();
  toast(name ? `${many(rows)} assigned to ${name === ME() ? 'you' : name}` : `${many(rows)} unassigned`,
    { label: 'Undo', run: () => { rows.forEach((r, i) => { r.assignee = was[i]; }); actOf(u).pop(); saveWork(); paint(); } });
}
function setDocs(rows, st, why, proof) {
  const u = UPDATES.find(x => x.id === state.impact), was = rows.map(r => [r.st, r.done, r.proof]), wasU = u.st, mark = actOf(u).length;
  const pf = (r) => typeof proof === 'function' ? proof(r) : proof || null;
  rows.forEach(r => { r.st = st; r.done = st === 'done'; r.proof = st === 'done' ? pf(r) : r.proof; });
  state.sel = new Set(); if (rows.some(r => r.id === state.open)) state.open = null;
  const said = st === 'done' ? [...new Set(rows.map(r => r.proof))] : [];
  log(u, { what: st === 'done' ? 'marked as done' : 'reopened', refs: rows.map(r => r.id), text: said.length === 1 && said[0] ? said[0] : undefined });
  syncUpdate(u);
  refreshRows(); paint();
  toast(st === 'done' ? (u.st === 'done' && wasU !== 'done' ? `${many(rows)} completed. Nothing is left, so the update is completed` : `${many(rows)} marked as completed`) : `${many(rows)} reopened`,
    { label: 'Undo', run: () => { rows.forEach((r, i) => { [r.st, r.done, r.proof] = was[i]; }); u.st = wasU; actOf(u).length = mark; saveWork(); refreshRows(); paint(); } });
}
/* the update follows its documents: done when none is left open, back in progress when one reopens */
function syncUpdate(u) {
  const rows = allRows(u.id); if (!rows.length) return;
  const open = rows.some(r => r.st === 'open');
  if (u.st === 'open' && !open) { u.st = 'done'; actOf(u).push({ who: 'Clavia', what: 'moved this update to Completed: every document is completed', when: new Date().toISOString() }); }
  else if (u.st === 'done' && open) { u.st = 'open'; actOf(u).push({ who: 'Clavia', what: 'moved this update back to Open: a document reopened', when: new Date().toISOString() }); }
  saveWork();
}
function setDue(rows, iso) {
  const u = UPDATES.find(x => x.id === state.impact), was = rows.map(r => r.by);
  rows.forEach(r => { r.by = iso || undefined; }); state.sel = new Set();
  log(u, iso ? { what: 'set the due date', refs: rows.map(r => r.id), date: iso } : { what: 'removed the due date', refs: rows.map(r => r.id) });
  paint();
  toast(iso ? `${many(rows)} due ${shortDate(iso)}` : `Due date removed from ${many(rows)}`, { label: 'Undo', run: () => { rows.forEach((r, i) => { r.by = was[i]; }); actOf(u).pop(); saveWork(); paint(); } });
}
/* the due date is picked on Clavia's own calendar (the month the Due filter opens), right under the
   date clicked: pick a day and it is set; Remove takes it off. Never the browser's date box. */
let duePop = null;
function closeDue() { duePop?.remove(); duePop = null; removeEventListener('mousedown', dueOut, true); removeEventListener('keydown', dueKey, true); }
function dueOut(e) { if (duePop && !duePop.contains(e.target)) closeDue(); }
function dueKey(e) { if (e.key === 'Escape' && duePop) { e.stopPropagation(); closeDue(); } }
function pickDue(anchor, rows) {
  closeDue();
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const cur = rows.length === 1 ? rows[0].by || null : null;
  const t0 = new Date(); t0.setHours(0, 0, 0, 0);
  const at = cur ? new Date(cur + 'T12:00:00') : t0;
  let month = new Date(at.getFullYear(), at.getMonth(), 1);
  const NAV = (d) => `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
  const cal = h('div', { class: 'mx-cal' });
  const pop = h('div', { class: 'mx-fpop is-cal', role: 'dialog', 'aria-label': 'Due date' }, cal);
  const paintCal = () => {
    const first = new Date(month), lead = (first.getDay() + 6) % 7, start = new Date(first); start.setDate(1 - lead);
    const days = Array.from({ length: 42 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return d; });
    cal.replaceChildren(
      h('div', { class: 'mx-cal-h' },
        h('button', { class: 'mx-cal-nav', type: 'button', 'aria-label': 'Previous month', onclick: () => { month = new Date(month.getFullYear(), month.getMonth() - 1, 1); paintCal(); }, html: NAV('M10 3.5 5.5 8l4.5 4.5') }),
        h('span', { class: 'mx-cal-m' }, month.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })),
        h('button', { class: 'mx-cal-nav', type: 'button', 'aria-label': 'Next month', onclick: () => { month = new Date(month.getFullYear(), month.getMonth() + 1, 1); paintCal(); }, html: NAV('M6 3.5 10.5 8 6 12.5') })),
      h('div', { class: 'mx-cal-g' }, ...['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(x => h('span', { class: 'mx-cal-dow' }, x)),
        ...days.map(d => { const k = iso(d);
          return h('button', { class: 'mx-cal-d' + (d.getMonth() !== month.getMonth() ? ' is-out' : '') + (k === cur ? ' is-edge' : '') + (d.getTime() === t0.getTime() ? ' is-today' : ''), type: 'button',
            'aria-label': d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), onclick: () => { closeDue(); if (k !== cur) setDue(rows, k); } }, h('span', {}, String(d.getDate()))); })),
      h('div', { class: 'mx-cal-f' }, h('span', { class: 'mx-cal-say' }, cur ? `Due ${shortDate(cur)}` : rows.length > 1 ? `Due date for ${rows.length} documents` : 'Pick a due date'),
        cur ? h('button', { class: 'mx-fclear', type: 'button', onclick: () => { closeDue(); setDue(rows, null); } }, 'Remove') : null));
  };
  paintCal();
  document.body.append(pop); duePop = pop;
  /* under the date, its left edge on the date's; above it when there is no room below */
  const r = anchor.getBoundingClientRect(), below = innerHeight - r.bottom > pop.offsetHeight + 12;
  pop.style.top = (below ? r.bottom + 6 : Math.max(12, r.top - pop.offsetHeight - 6)) + 'px';
  pop.style.left = Math.max(12, Math.min(r.left, innerWidth - pop.offsetWidth - 12)) + 'px';
  setTimeout(() => { addEventListener('mousedown', dueOut, true); addEventListener('keydown', dueKey, true); }, 0);
}
const DUE_CHEV = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 6.5 8 10l3.5-3.5"/></svg>';
function dueBtn(r, label) {
  const soon = r.by && r.st === 'open' && daysTo(r.by) < 14;
  const b = h('button', { class: 'hz-due tn' + (soon ? ' hz-soon' : '') + (r.by ? '' : ' is-none'), type: 'button', 'aria-label': r.by ? `Due ${shortDate(r.by)}. Change` : 'Set a due date',
    onclick: (e) => { e.stopPropagation(); pickDue(b, [r]); } },
    r.st === 'done' && !label ? 'Completed' : r.by ? (label ? `Due ${shortDate(r.by)}` : shortDate(r.by).replace(/ \d{4}$/, '')) : (label ? 'Add due date' : 'Add date'),
    h('span', { class: 'rqv-chev', html: DUE_CHEV }));
  return b;
}
/* who has it: Intake's assignee control and picker */
const CHEV = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 6.5 8 10l3.5-3.5"/></svg>';
const avatar = (n, cls = 'pb-av') => typeof mxFace === 'function' ? mxFace(n, cls) : face(n);
function pickAssignee(anchor, rows) {
  const cur = rows.length === 1 ? rows[0].assignee : null;
  if (typeof mxAssignPicker === 'function') return mxAssignPicker(anchor, { attorney: cur, resolvedBy: true }, (n) => assignDocs(rows, n));
  menuAt(anchor, ['Roger Bennett', 'Grace Coleman', 'Matt Rivera'].map(n => ({ label: n, tick: n === cur, run: () => assignDocs(rows, n) })));
}
function assigneeBtn(r) {
  const b = h('button', { class: 'mx-atty' + (r.assignee ? '' : ' is-none'), type: 'button', 'aria-haspopup': 'listbox',
    'aria-label': r.assignee ? `Assigned to ${r.assignee}. Change` : 'Assign someone',
    onclick: (e) => { e.stopPropagation(); pickAssignee(b, [r]); } },
    ...(r.assignee ? [avatar(r.assignee), h('span', { class: 'pb-owner-n' }, r.assignee)] : [h('span', { class: 'mx-atty-t' }, 'Unassigned')]),
    h('span', { class: 'mx-atty-chev', html: CHEV }));
  return b;
}
function docMenu(anchor, r) {
  /* the same three as a row in Intake, in Intake's words: Open, Mark as Completed and, set apart, Delete */
  menuAt(anchor, [
    { label: 'Open', icon: 'files', run: () => openRow(r.id) },
    r.st === 'open' ? { label: 'Mark as Completed', icon: 'use', run: () => markDone([r]) } : { label: 'Reopen', icon: 'retry', run: () => setDocs([r], 'open') },
    { rule: true },
    { label: 'Delete', icon: 'trash', danger: true, run: () => removeDoc(r) }]);
}
/* delete: the document is not touched by this update after all; it leaves this update's list (not Clavia), with Undo */
function removeDoc(r) {
  const u = UPDATES.find(x => x.id === state.impact), wasU = u.st, mark = actOf(u).length;
  r.removed = true; state.sel?.delete(r.id);
  log(u, { what: 'removed from this update', refs: [r.id] });
  syncUpdate(u); refreshRows(); paint();
  toast(`Deleted “${shortN(r)}” from this update`, { label: 'Undo', run: () => { r.removed = false; u.st = wasU; actOf(u).length = mark; saveWork(); refreshRows(); paint(); } });
}
let state = { view: 'horizon', impact: 'HZ-231', watch: 'eu-data', stage: 'all', open: null, pop: false };
try { const s = localStorage.getItem('clavia-ri-stage'); if (s && (s === 'all' || STAGE[s])) state.stage = s; } catch (e) {}
const root = h('div', { class: 'hzx' }), page = h('div', { class: 'pb', id: 'hzx-page' }), slot = h('div', { class: 'hzx-slot' });
root.append(page, slot);
function go(v) { state.view = v; state.chat = null; state.sel = new Set(); state.open = null; state.pop = false; state.menu = false; state.wmenu = null; if (v !== 'watch') state.fresh = null; try { localStorage.setItem('clavia-ri-view', JSON.stringify({ view: v, watch: state.watch, impact: state.impact, })); } catch (e) {} syncAddress(); paint(); scrollTop(); }
function paint() {
  closeDue();
  paintRail(); closePop();
  const kids = ({ horizon: horizonView, watch: watchView, new: newWatchView, doc: docView }[state.view] || impactView)().filter(Boolean);
  page.className = 'pb' + (state.view === 'doc' ? ' is-doc' : '');
  root.classList.toggle('is-docview', state.view === 'doc');
  page.replaceChildren(...kids);
  const u = (state.view === 'impact' || state.view === 'doc') && UPDATES.find(x => x.id === state.impact);
  const chat = u && state.view === 'impact' && state.chat === u.id;
  root.classList.toggle('is-chat', !!chat);
  root.replaceChildren(...(chat ? [chatCol(u), splitBar()] : []), page, slot);
  slot.replaceChildren(...[notifCard()].filter(Boolean));
}

/* ── the update ── */
function impactView() {
  const u = UPDATES.find(x => x.id === state.impact) || UPDATES.find(x => x.id === 'HZ-231'), I = IMPACT[u.id] || { src: u.src, stage: null };
  const d = DETAIL[u.id] || { sum: [u.lede], why: '' };
  if (u.unread) { u.unread = false; saveWork(); }   /* opened, so read, however it was reached */
  const toWatch = () => { state.watch = u.watch; go('watch'); };
  const left = u.next ? daysTo(u.next) : -1, n = ROWS.length;
  const open = ROWS.filter(r => r.verdict !== 'ok' && !r.done), agree = open.filter(r => r.stage === 'signed').length;
  const order = { urgent: 0, high: 1, low: 2 }, first = open.slice().sort((a, b) => order[a.prio] - order[b.prio] || (a.by || '9').localeCompare(b.by || '9'))[0];
  const ICO = (d, n = 15) => `<svg width="${n}" height="${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  /* the summary, as Clavia writes one for a request: a line, then the points under bold labels; it folds to its heading */
  const points = [
    left >= 0 ? ['Applies from', `${shortDate(u.next)}, ${left} days from now.`] : null,
    d.why ? ['Why it matters', d.why] : null,
    ['Our documents', n ? `${open.length} of ${n} need a change${agree ? `; ${agree} signed ${agree === 1 ? 'contract needs' : 'contracts need'} the other side to agree` : ''}.` : 'Nothing in our contracts, templates, playbooks or open requests is touched.'],
  ].filter(Boolean);
  const W = watchOf(u.watch), checked = W ? scopeOf(W).reduce((k, x) => k + scopeN(x), 0) : 0;
  const scopeLine = W ? [' Clavia checked ', h('button', { class: 'hz-scope-a', type: 'button', onclick: () => scopeDialog(u) }, `${checked} documents in this watch’s scope`), '.'] : [];
  const ai = h('section', { class: 'rqp-ai' + (hzState.aiFold ? ' is-folded' : '') });
  const aiHead = h('button', { class: 'rqp-ai-h', type: 'button', 'aria-expanded': String(!hzState.aiFold), onclick: () => {
    hzState.aiFold = !hzState.aiFold; ai.classList.toggle('is-folded', hzState.aiFold); aiHead.setAttribute('aria-expanded', String(!hzState.aiFold)); } },
    h('span', { class: 'rqp-ai-star', html: typeof SPARK_ONE === 'string' ? SPARK_ONE : '' }), h('span', {}, 'AI Summary'),
    h('span', { class: 'rqp-ai-chev', html: ICO('<path d="m7 10 5 5 5-5"/>', 14) }));
  ai.append(aiHead, h('div', { class: 'rqp-ai-body' }, h('div', { class: 'rqp-ai-t' },
    h('p', { class: 'rqp-ai-intro' }, u.lede),   /* what changed; what it means for us is in the points */
    h('ul', { class: 'rqp-ai-pts' }, ...points.map(([k, t]) => h('li', {}, h('b', {}, k), ' ', t, ...(k === 'Our documents' ? scopeLine : [])))))));
  return [
    /* Clavia's detail header: back to where it came from; status and actions at the right */
    h('div', { class: 'br-top' },
      h('button', { class: 'br-back', type: 'button', onclick: toWatch }, h('span', { class: 'br-back-a', html: ICO('<path d="M19 12H5M11 6l-6 6 6 6"/>') }), watchOf(u.watch)?.name || 'Horizon'),
      h('div', { class: 'br-top-r' },
        updateStatusBtn(u),
        h('button', { class: 'hz-prio', type: 'button', title: 'How priority is set', 'aria-label': 'Priority. How priority is set', onclick: howDialog }, prio(n ? overall() : u.prio)),
        h('button', { class: 'br-dots', type: 'button', 'aria-label': 'More actions', title: 'More Actions', 'aria-haspopup': 'menu', html: DOTS,
          onclick: (e) => { e.stopPropagation(); menuAt(e.currentTarget, [
            /* Ask Clavia lives here now: the header carries the priority and ⋯, nothing else */
            { label: state.chat === u.id ? 'Close Ask Clavia' : 'Ask Clavia', icon: 'ask', run: () => { state.chat = state.chat === u.id ? null : u.id; paint(); if (state.chat) setTimeout(() => root.querySelector('.hzx-chat textarea')?.focus(), 0); } },
            { label: 'Save to Vault', html: typeof MX_VAULT_MARK === 'string' ? MX_VAULT_MARK : null, icon: 'files', run: () => { log(u, { what: 'saved this to Vault › Regulatory updates' }); paint(); toast(`Saved “${nameOf(u)}” to Vault › Regulatory updates`); } },
            { label: 'Copy Link', icon: 'copy', run: () => { navigator.clipboard?.writeText(location.href).catch(() => {}); toast('Link copied'); } },
            { rule: true },
            u.st === 'archived' ? { label: 'Unarchive', icon: 'archive', run: () => setUpdate(u, 'open') } : { label: 'Archive', icon: 'archive', run: () => archiveUpdate(u) }]); } }))),
    h('h1', { class: 'br-title' }, u.title),
    h('div', { class: 'br-meta' }, ...[srcLink(u, I.src), I.stage ? `${u.type} · ${I.stage}` : u.type, u.juris, `Found ${agoD(u.days)}`].flatMap((t, i) => [i ? h('span', { class: 'mt-sep' }, '·') : null, typeof t === 'string' ? h('span', {}, t) : t]).filter(Boolean)),
    u.st === 'archived' && (u.why || u.archBy) ? h('p', { class: 'hz-why' }, h('b', {}, `Archived${u.archBy ? ` by ${u.archBy === ME() ? 'you' : u.archBy}` : ''}.`), u.why ? ' ' + u.why : '') : null,
    ai,
    sectionTabs(u),
    ...(state.utab === 'activity' ? [activityView(u)]
      : allRows(u.id).length ? [docsBar(u), docsTable(allRows(u.id).filter(r => r.st === (state.dtab === 'done' ? 'done' : 'open')))]
      : [h('p', { class: 'ud-none hz-none' }, 'Nothing in our contracts, templates, playbooks or open requests.')]),
  ];
}

/* ── where the update came from: the publisher's own page, opened in a new tab ──
   In the prototype each link is the law itself where it exists (EUR-Lex, legislation.gov.uk), or the
   publisher's page for the topic; the live feed would carry the exact page of each development. */
const SRC_URL = {
  'HZ-231': 'https://eur-lex.europa.eu/eli/reg/2023/2854/oj',
  'HZ-238': 'https://www.legislation.gov.uk/ukpga/2025/18/contents',
  'HZ-237': 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
  'HZ-236': 'https://u.ae/en/about-the-uae/digital-uae/data/data-protection-laws',
  'HZ-235': 'https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act',
  'HZ-233': 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/',
  'HZ-234': 'https://cppa.ca.gov/regulations/',
  'HZ-229': 'https://eur-lex.europa.eu/eli/reg/2022/2554/oj',
  'HZ-230': 'https://www.ncsa.gov.qa/',
  'HZ-228': 'https://www.gov.ie/',
  'HZ-243': 'https://www.gov.ie/',
  'HZ-242': 'https://www.bundesregierung.de/',
  'HZ-241': 'https://www.gazzettaufficiale.it/',
};
const EXT = '<svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2.5h4v4M13.5 2.5 8 8M12 9.5v3a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3"/></svg>';
function srcLink(u, label) {
  const url = SRC_URL[u.id] || (u.src && /\./.test(u.src) ? `https://${u.src}` : null);
  if (!url) return label;
  return h('a', { class: 'hz-src', href: url, target: '_blank', rel: 'noopener noreferrer', 'data-tip': `Open on ${new URL(url).hostname.replace(/^www\./, '')}` },
    label, h('span', { class: 'hz-src-ic', 'aria-hidden': 'true', html: EXT }));
}

/* ── a document, opened: Intake's request page (.rqp) for one document an update touches ──
   Left, the document read as a piece of work: back to the update, its status and ⋯, the name, one
   meta line, who has it and its priority, then Overview (Clavia's AI Summary and the other documents
   in the update) and Activity (this document's lines from the update's activity, with a comment box),
   and "Ask about …" docked at the foot, which opens a Clavia chat as Intake's does. Right, the
   document itself with the clause Horizon found marked, and Horizon's note under it.
   Address: #horizon/HZ-231/doc/harbor */
const DOC_ST = () => {
  const S = typeof MX_ST !== 'undefined' ? MX_ST.req : null;
  return {
    open: { label: 'Open', color: '#C28A1E', svg: S ? S.progress.svg : '' },
    done: { label: 'Completed', color: '#3A8457', svg: S ? S.done.svg : '' },
  };
};
function openDoc(id) { const r = allRows().find(x => x.id === id); if (!r) return; state.docId = id; state.dtabDoc = 'overview'; go('doc'); }
const plainQuote = (r) => r.quote.map(p => typeof p === 'function' ? p(h).textContent : p).join('').trim();
function docAsk(u, r, q) {
  const d = DETAIL[u.id] || { why: '' }, first = r.assignee ? r.assignee.split(' ')[0] : null;
  log(u, { what: 'asked Clavia about', refs: [r.id], text: q });
  if (typeof openSession !== 'function') return toast('Clavia’s chat isn’t available here');
  const answer = `**What it says.** “${plainQuote(r)}” (${r.cite}).\n\n`
    + `**Why it matters.** ${d.why || u.lede}\n\n`
    + `**What to do.** ${r.st === 'done' ? 'It is completed.' : `${r.next}${r.by ? `, by ${shortDate(r.by)}` : ''}.`} ${first ? `${r.assignee} has it.` : 'No one has it yet.'}`;
  openSession({ id: `hz-ask-${r.id}-${Date.now()}`, label: shortN(r), meta: 'now', people: [{ name: ME(), online: true, owner: true }],
    messages: [{ role: 'user', text: q },
      { role: 'bot', cites: null, steps: [{ source: 'request', query: `Read ${shortN(r)} against ${nameOf(u)}`, count: '1 document' }], answer,
        suggest: [`Draft the email about ${shortN(r)}`, 'What happens if we do nothing?'] }] });
}
function docView() {
  const u = UPDATES.find(x => x.id === state.impact), r = allRows().find(x => x.id === state.docId);
  if (!u || !r) { state.view = 'impact'; return impactView(); }
  const d = DETAIL[u.id] || { why: '' }, ST = DOC_ST(), tab = state.dtabDoc || 'overview';
  const ICO = (p, n = 15) => `<svg width="${n}" height="${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const back = () => { state.utab = 'docs'; state.dtab = r.st; go('impact'); };
  /* status, as a request's: the ring, the word, a chevron; the menu moves it */
  const st = ST[r.st];
  const stBtn = h('button', { class: 'pb-st mx-st mx-st-btn rqp-stage', type: 'button', 'data-tip': 'Change Status', 'aria-haspopup': 'menu', style: `--st:${st.color}`,
    onclick: (e) => { e.stopPropagation(); menuAt(e.currentTarget, ['open', 'done'].map(k => ({ label: ST[k].label, html: ST[k].svg, tick: r.st === k,
      run: () => { if (k === r.st) return; if (k === 'done') markDone([r]); else setDocs([r], k); } }))); } },
    h('span', { class: 'pb-st-ic', html: st.svg }), st.label, h('span', { class: 'rqp-stage-chev', html: ICO('<path d="m6 9 6 6 6-6"/>', 12) }));
  const more = h('button', { class: 'br-dots', type: 'button', 'aria-label': 'More actions', 'data-tip': 'More Actions', html: DOTS,
    onclick: (e) => { e.stopPropagation(); menuAt(e.currentTarget, [
      { label: 'Copy Link', icon: 'copy', run: () => { navigator.clipboard?.writeText(location.href).catch(() => {}); toast('Link copied'); } }]); } });
  const mine = actOf(u).filter(a => (a.refs || []).includes(r.id));
  const tabs = (() => {
    const T = [['overview', 'Overview'], ['activity', 'Activity', mine.length]];
    const ink = h('span', { class: 'br-ink', 'aria-hidden': 'true' });
    const btns = T.map(([k, l, c]) => h('button', { class: 'br-tab', type: 'button', role: 'tab', 'aria-selected': String(tab === k), onclick: () => { state.dtabDoc = k; paint(); } },
      l, c != null ? h('span', { class: 'rqp-tab-n' }, String(c)) : null));
    requestAnimationFrame(() => { const on = btns.find(b => b.getAttribute('aria-selected') === 'true'); if (on?.offsetWidth) { ink.style.setProperty('--w', on.offsetWidth + 'px'); ink.style.setProperty('--x', on.offsetLeft + 'px'); } });
    return h('div', { class: 'br-tabs', role: 'tablist' }, ...btns, ink);
  })();
  /* Overview: the summary Clavia writes for this document, then the rest of the update's documents */
  const ai = h('section', { class: 'rqp-ai' + (hzState.docFold ? ' is-folded' : '') });
  const aiHead = h('button', { class: 'rqp-ai-h', type: 'button', 'aria-expanded': String(!hzState.docFold), onclick: () => { hzState.docFold = !hzState.docFold; ai.classList.toggle('is-folded', hzState.docFold); } },
    h('span', { class: 'rqp-ai-star', html: typeof SPARK_ONE === 'string' ? SPARK_ONE : '' }), h('span', {}, 'AI Summary'), h('span', { class: 'rqp-ai-chev', html: ICO('<path d="m7 10 5 5 5-5"/>', 14) }));
  ai.append(aiHead, h('div', { class: 'rqp-ai-body' }, h('div', { class: 'rqp-ai-t' },
    /* only what is true of this document: the law itself is explained once, on the update; the words are marked on the right */
    h('p', { class: 'rqp-ai-intro' }, r.issue || `${VERDICT[r.verdict]} in ${r.cite.split(' · ').pop()}.`),
    h('ul', { class: 'rqp-ai-pts' }, r.st === 'done'
      ? h('li', {}, h('b', {}, 'Completed'), ' ', `${r.proof || 'Nothing left to change'}. `, h('button', { class: 'sx-link hz-fix-edit', type: 'button', onclick: () => fixDialog(u, r) }, 'Change'))
      : h('li', {}, h('b', {}, 'Next step'), ' ', `${r.next}.`)))));
  const body = tab === 'activity' ? activityView(u, r.id) : h('div', {}, ai, alsoIn(u, r));
  const ask = h('input', { class: 'mt-ask-in', type: 'text', placeholder: `Ask about ${shortN(r)}`, 'aria-label': `Ask about ${shortN(r)}`,
    onkeydown: (e) => { if (e.key === 'Enter' && ask.value.trim()) { e.preventDefault(); docAsk(u, r, ask.value.trim()); } } });
  /* narrow, the document waits behind a button, as a request's does; Details brings you back */
  const docOpen = h('button', { class: 'br-pane rqp-doc-open', type: 'button', 'data-tip': 'Show document', 'aria-label': 'Show document', onclick: (e) => { const g = e.currentTarget.closest('.rqp'); g.classList.remove('is-doc-hidden'); g.classList.add('show-doc'); } },
    h('span', { class: 'br-pane-ic', html: ICO('<path d="M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3.5V8h4.5"/><path d="M8.5 13h7M8.5 16.5h4.5"/>', 16) }));
  const left = h('div', { class: 'rqp-left' }, h('div', { class: 'br-panes rqp-panes' }, docOpen),
    h('div', { class: 'rqp-left-in' },
      h('div', { class: 'br-top' },
        h('button', { class: 'br-back', type: 'button', onclick: back }, h('span', { class: 'br-back-a', html: ICO('<path d="M19 12H5M11 6l-6 6 6 6"/>') }), nameOf(u)),
        h('div', { class: 'br-top-r' }, stBtn, more)),
      h('h1', { class: 'br-title rqp-title' }, shortN(r)),
      h('div', { class: 'br-meta rqp-meta' }, ...[r.type, STAGE[r.stage], r.sub].flatMap((t, i) => [i ? h('span', { class: 'mt-sep' }, '·') : null, h('span', {}, t)]).filter(Boolean)),
      h('div', { class: 'rqp-ctl' }, assigneeBtn(r),
        h('button', { class: 'hz-prio', type: 'button', 'aria-haspopup': 'menu', 'data-tip': 'Change Priority', onclick: (e) => { e.stopPropagation(); changePrio(e.currentTarget, r); } }, prio(r.prio)),
        r.st === 'open' ? dueBtn(r, true) : null),
      tabs,
      h('div', { class: 'rqp-body' }, body)),
    h('div', { class: 'rqp-dock' }, h('div', { class: 'mt-ask rqp-ask-bar' },
      h('span', { class: 'rqp-ask-ic', html: '<img src="' + QUILL + '" alt="" style="width:16px;height:16px;filter:invert(1) brightness(.35)">' }), ask)));
  return [docFrame(u, r, left)];
}

/* ── the document itself, on the right of its page ──
   A document in an Intake request opens in Intake's own viewer: Clavia builds the request's page and
   Horizon's left pane takes the place of the request's, so the right is the request's document with
   every option it has there (switch document, versions, comments, Download, Email with Outlook, Open in
   Word, Close). A template, a playbook or a Vault file opens in the same frame, read from where it
   lives in Clavia. Either way, the words Horizon found are marked (a CSS highlight, so the document's
   own text is never touched) and a line above the page says why. */
function docFrame(u, r, left) {
  /* every document, wherever it lives, opens in the same simple reader: its text with the words marked,
     and a way to open it where it is edited (Intake, Templates, Playbooks, the Vault) */
  const grid = h('div', { class: 'rqp' }, left, ownViewer(u, r));
  afterDoc(grid, u, r);
  return h('div', { class: 'rqp-host hz-doc' }, grid);
}
const VIEW_ICO = (p, n = 15) => `<svg width="${n}" height="${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
function docBlocks(r) {
  const ref = r.ref || {}, esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  if (ref.kind === 'template') {
    const t = (typeof mxData === 'function' && mxData().templates || []).find(x => x.id === ref.id);
    if (!t) return null;
    const fill = (txt) => esc(txt).replace(/\{\{(\w+)\}\}/g, (m, k) => `<span class="mx-chip">${esc(t.fields.find(f => f.key === k)?.hint || k)}</span>`);
    const v = (typeof MX_TPL_VER !== 'undefined' && MX_TPL_VER[t.id]) || 1;
    return { title: t.name, ver: `v${v}`, open: ['Open Template', () => mxOpen('templates', t.id)],
      blocks: [{ t: 'h1', v: esc(t.name) }, { t: 'meta', v: `TEMPLATE · ${esc(t.kind.toUpperCase())} · V${v}` }, ...t.body.map(b => b.h ? { t: 'h2', v: esc(b.h) } : { t: 'p', v: fill(b.p) })] };
  }
  if (ref.kind === 'playbook') {
    const pb = (typeof pbAll === 'function' ? pbAll() : null)?.find?.(x => x.id === ref.id) || (typeof PLAYBOOK_SEED !== 'undefined' ? PLAYBOOK_SEED.find(x => x.id === ref.id) : null);
    if (!pb) return null;
    const out = [{ t: 'h1', v: esc(pb.name) }, { t: 'meta', v: `PLAYBOOK · V${pb.version} · ${esc(String(pb.status).toUpperCase())}` }];
    let sec = null;
    pb.clauses.forEach((c, i) => {
      if (c.section && c.section !== sec) { sec = c.section; out.push({ t: 'h2', v: esc(sec) }); }
      out.push({ t: 'p', v: `<b>${i + 1}. ${esc(c.topic)}</b>` });
      if (c.preferred) out.push({ t: 'p', v: `<b>Starting position.</b> ${esc(c.preferred)}` });
      if (c.fallback) out.push({ t: 'p', v: `<b>Fallback.</b> ${esc(c.fallback)}` });
      if (c.walkaway) out.push({ t: 'p', v: `<b>Not acceptable.</b> ${esc(c.walkaway)}` });
    });
    return { title: pb.name, ver: `v${pb.version}`, open: ['Open Playbook', () => { location.hash = 'playbooks/' + pb.id; }], blocks: out };
  }
  if (ref.kind === 'request') {
    const R = typeof mxIntake === 'function' ? mxIntake().find(x => x.id === ref.id) : null;
    const d = R && typeof mxDocuments === 'function' ? (mxDocuments(R).find(x => x.id === (ref.doc || 'd1')) || mxDocuments(R)[0]) : null;
    const last = d?.versions?.[d.versions.length - 1];
    if (!last) return null;
    return { title: (d.title || r.name).replace(/\.(docx|pdf)$/, ''), ver: null, open: ['Open in Intake', () => mxOpen('intake', R.id)], blocks: last.blocks };
  }
  if (ref.kind === 'vault') {
    const v = (typeof mxData === 'function' && mxData().vaults || []).find(x => x.id === ref.id), f = v?.files.find(x => x.name === ref.file);
    if (!f) return null;
    return { title: f.name, ver: null, none: true, open: ['Open in Vault', () => mxOpen('vault', v.id)],
      blocks: [{ t: 'h1', v: esc(f.name) }, { t: 'meta', v: `VAULT · ${esc(v.name.toUpperCase())} · ${esc(String(f.kind).toUpperCase())}${f.size ? ' · ' + esc(f.size).toUpperCase() : ''}` },
        { t: 'p', v: esc(f.summary || '') }, ...Object.entries(f.facts || {}).map(([k, x]) => ({ t: 'p', v: `<b>${esc(k)}.</b> ${esc(x)}` })),
        { t: 'p', v: '<span class="hz-nopv">There is no preview of this file in Clavia. Open it in the Vault to read it.</span>' }] };
  }
  return null;
}
function ownViewer(u, r) {
  const D = docBlocks(r) || { title: shortN(r), ver: null, blocks: [{ t: 'h1', v: shortN(r) }, { t: 'p', v: plainQuote(r) }] };
  const page_ = h('div', { class: 'doc-page rqp-page' }, ...D.blocks.map(b => b.t === 'meta' ? h('p', { class: 'doc-meta rqp-meta-line', html: b.v }) : h(b.t === 'h1' ? 'h1' : b.t === 'h2' ? 'h2' : 'p', { class: b.t === 'h1' ? 'doc-h1' : b.t === 'h2' ? 'doc-h2' : 'doc-p', html: b.v })));
  const file = () => { const blob = new Blob([`<html><head><meta charset="utf-8"><title>${D.title}</title></head><body>${page_.innerHTML}</body></html>`], { type: 'application/msword' });
    const a = h('a', { href: URL.createObjectURL(blob), download: `${D.title}.doc` }); document.body.append(a); a.click(); a.remove(); toast(`Downloaded ${D.title}`); };
  const tool = (label, ico, run, word) => h('button', { class: 'rqp-tool ' + (word ? 'rqp-tool--word' : 'rqp-tool--icon'), type: 'button', 'data-tip': label, 'aria-label': label, onclick: run },
    ico.startsWith('<') ? h('span', { html: ico }) : h('img', { src: ico, alt: '' }), h('span', { class: 'rqp-tool-t' }, label));
  return h('section', { class: 'rqp-right' },
    h('header', { class: 'rqp-bar' },
      h('div', { class: 'rqp-bar-l' },
        h('button', { class: 'rqp-doc-back', type: 'button', onclick: (e) => e.currentTarget.closest('.rqp').classList.remove('show-doc') }, h('span', { html: VIEW_ICO('<path d="M19 12H5M11 6l-6 6 6 6"/>', 14) }), 'Details'),
        h('span', { class: 'rqp-docsw hz-docn' }, h('span', { class: 'rqp-doc-n' }, D.title))),
      h('div', { class: 'rqp-bar-r' },
        D.open ? h('button', { class: 'rqp-tool hz-open', type: 'button', onclick: D.open[1] }, D.open[0]) : null,
        D.none ? null : tool('Download', '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7.5 10.5 12 15l4.5-4.5"/><path d="M4.5 17v1.5A1.5 1.5 0 0 0 6 20h12a1.5 1.5 0 0 0 1.5-1.5V17"/></svg>', file),
        D.none ? null : tool('Open in Word', 'assets/brand/word.svg', file, true),
        h('button', { class: 'rqp-fold', type: 'button', 'aria-label': 'Close the document', 'data-tip': 'Close', html: VIEW_ICO('<path d="M6 6l12 12M18 6 6 18"/>', 15),
          onclick: (e) => e.currentTarget.closest('.rqp').classList.add('is-doc-hidden') }))),
    h('div', { class: 'rqp-docbody' }, h('div', { class: 'rqp-scroll' }, page_)));
}
/* find the words in the page, mark them, say why above the page, and bring them into view */
function afterDoc(grid, u, r) {
  if (!grid) return;
  setTimeout(() => {
    const scroll = grid.querySelector('.rqp-scroll'), pg = grid.querySelector('.rqp-page');
    if (!scroll || !pg) return;
    const range = r.find ? rangeOf(pg, r.find) : null;
    if (range && typeof Highlight !== 'undefined' && CSS.highlights) { CSS.highlights.set('hz-hit', new Highlight(range)); toRange(scroll, range); }
  }, 80);
}
function rangeOf(root, text) {
  const norm = (s) => s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s/g, ' ');
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), nodes = []; let all = '';
  while (walker.nextNode()) { nodes.push([walker.currentNode, all.length]); all += walker.currentNode.nodeValue; }
  const i = norm(all).indexOf(norm(text)); if (i < 0) return null;
  const at = (k) => { for (let j = nodes.length - 1; j >= 0; j--) if (nodes[j][1] <= k) return [nodes[j][0], k - nodes[j][1]]; return [nodes[0][0], 0]; };
  const range = document.createRange(), [a, ao] = at(i), [b, bo] = at(i + text.length);
  range.setStart(a, ao); range.setEnd(b, Math.min(bo, b.nodeValue.length)); return range;
}
function toRange(scroll, range) {
  const r = range.getBoundingClientRect(), s = scroll.getBoundingClientRect();
  scroll.scrollTo({ top: scroll.scrollTop + (r.top - s.top) - s.height / 3, behavior: 'smooth' });
}

/* ── an update's status: Open, Completed (when no document is left open) or Archived; people are assigned to documents, not to the update ──
   The status follows the documents; Archive in ⋯ is the one choice, made for the whole team. */
const UST = () => {
  const S = typeof MX_ST !== 'undefined' ? MX_ST.req : null;
  return {
    open: { label: 'Open', color: '#C28A1E', svg: S ? S.progress.svg : '' },
    done: { label: 'Completed', color: '#3A8457', svg: S ? S.done.svg : '' },
    archived: { label: 'Archived', color: '#B5B0A7', svg: S ? S.cancelled.svg : '' },
  };
};
const openDocsOf = (u) => allRows(u.id).filter(r => r.st === 'open');
function setUpdate(u, st, why) {
  const was = [u.st, u.why, u.archBy, u.preArch], mark = actOf(u).length;
  if (st === 'archived') { u.preArch = u.st; u.st = 'archived'; u.why = why || null; u.archBy = ME(); log(u, { what: 'archived this update', text: why || undefined }); }
  else { u.st = u.preArch === 'done' ? 'done' : 'open'; u.why = null; u.archBy = null; log(u, { what: 'unarchived this update' }); }
  saveWork(); paint();
  toast(st === 'archived' ? `“${nameOf(u)}” archived for everyone` : `“${nameOf(u)}” is back`,
    { label: 'Undo', run: () => { [u.st, u.why, u.archBy, u.preArch] = was; actOf(u).length = mark; saveWork(); paint(); } });
}
/* archive: not for us. It goes for everyone on the watch, with a reason if one is given */
function archiveUpdate(u) {
  const n = openDocsOf(u).length;
  const ta = h('textarea', { class: 'ta', rows: '3', placeholder: 'e.g. We have no customers or processing in Qatar.', 'aria-label': 'Why it doesn’t apply' });
  dialog(`Archive “${nameOf(u)}”`, [h('p', { class: 'how-n' }, `It moves to Archived for everyone on the watch.${n ? ` ${n === 1 ? 'Its open document leaves' : `Its ${n} open documents leave`} everyone’s lists with it.` : ''} You can unarchive it from ⋯.`),
    h('label', { class: 'cf-f' }, h('span', { class: 'l' }, 'Why it doesn’t apply (optional)'), ta)],
    (c) => [h('button', { class: 'pb-btn', type: 'button', onclick: c }, 'Cancel'), h('button', { class: 'pb-btn primary', type: 'button', onclick: () => {
      c(); setUpdate(u, 'archived', ta.value.trim()); } }, 'Archive')]);
  setTimeout(() => ta.focus(), 0);
}
/* the update's status is shown, not set: it follows its documents (Archive is in ⋯) */
function updateStatusBtn(u) {
  const S = UST(), v = S[u.st] || S.open;
  return h('span', { class: 'pb-st mx-st rqp-stage hz-ust', style: `--st:${v.color}` }, h('span', { class: 'pb-st-ic', html: v.svg }), v.label);
}
/* ── done, with what fixed it: the record a lawyer would want to show later ── */
function proofsFor(rows) {
  const r = rows[0], k = r.ref?.kind, one = rows.length === 1;
  if (rows.some(x => x.ref?.kind !== k)) return ['Each document changed and published as a new version', 'No change needed'];
  return [
    k === 'request' ? (one ? `A new version in Intake ${r.ref.id}` : 'A new version in each Intake request') : null,
    k === 'template' ? 'The template published as a new version' : null,
    k === 'playbook' ? 'The playbook published as a new version' : null,
    k === 'vault' ? 'Replaced in the Vault' : null,
    k === 'request' || k === 'vault' ? 'An amendment or letter, signed' : null,
    'No change needed',
  ].filter(Boolean);
}
const guessFix = (r) => r.verdict === 'ok' ? 'No change needed' : proofsFor([r])[0];
function markDone(rows) {
  rows = rows.filter(r => r.st === 'open'); if (!rows.length) return;
  setDocs(rows, 'done', null, guessFix);
}
function fixDialog(u, r) {
  const P = proofsFor([r]), cur = (r.proof || '').split(' · ')[0]; let pick = P.includes(cur) ? cur : guessFix(r);
  const list = h('div', { class: 'hz-proofs', role: 'radiogroup', 'aria-label': 'What fixed it' });
  const draw = () => list.replaceChildren(...P.map(p => h('button', { class: 'hz-proof', type: 'button', role: 'radio', 'aria-checked': String(p === pick), onclick: () => { pick = p; draw(); } }, h('span', { class: 'bx' }), p)));
  draw();
  const ta = h('textarea', { class: 'ta', rows: '2', placeholder: 'e.g. Clause 6.1 now has no fee; signed on 4 Nov.', 'aria-label': 'Note' });
  ta.value = (r.proof || '').split(' · ').slice(1).join(' · ');
  dialog(`What fixed ${shortN(r)}?`, [
    h('div', { class: 'cf-f' }, list),
    h('label', { class: 'cf-f' }, h('span', { class: 'l' }, 'Note (optional)'), ta)],
    (c) => [h('button', { class: 'pb-btn', type: 'button', onclick: c }, 'Cancel'),
      h('button', { class: 'pb-btn primary', type: 'button', onclick: () => { c(); const was = r.proof; r.proof = pick + (ta.value.trim() ? ` · ${ta.value.trim()}` : '');
        if (r.proof === was) return; log(u, { what: 'noted what fixed', refs: [r.id], text: r.proof }); paint();
        toast('Saved', { label: 'Undo', run: () => { r.proof = was; actOf(u).pop(); saveWork(); paint(); } }); } }, 'Save')]);
}

/* ── Assigned to me: every open document that is yours, across every update, soonest first ── */
function myWork() {
  const order = { urgent: 0, high: 1, low: 2 };
  const rows = UPDATES.filter(u => u.st !== 'archived' && u.st !== 'done').flatMap(u => allRows(u.id).filter(r => r.assignee === ME() && r.st === 'open').map(r => [u, r]))
    .sort(([, a], [, b]) => (a.by || '9').localeCompare(b.by || '9') || order[a.prio] - order[b.prio]);
  if (!rows.length) return h('p', { class: 'ud-none hz-none' }, 'Nothing is assigned to you.');
  return h('div', { class: 'tbl-x' }, h('div', { class: 'mtbl', role: 'table' },
    h('div', { class: 'pb-tr pb-thead', role: 'row' }, ...['Document', 'Update', 'Finding', 'Priority', 'Due'].map(t => h('span', { class: 'pb-th', role: 'columnheader' }, t))),
    ...rows.map(([u, r]) => h('div', { class: 'pb-tr pb-row', role: 'row', tabindex: '0', onclick: () => { useImpact(u.id); openDoc(r.id); }, onkeydown: (e) => { if (e.key === 'Enter') { useImpact(u.id); openDoc(r.id); } } },
      h('span', { class: 'doc' }, h('span', { class: 'tile', 'aria-hidden': 'true' }), h('span', { class: 'doc-n' }, h('b', {}, r.name), h('span', {}, `${whereOf(r)} · ${STAGE[r.stage]}`))),
      h('span', { class: 'td hz-mw-u' }, nameOf(u)),
      h('span', { class: 'vd hz-find ' + r.verdict }, h('i'), VERDICT[r.verdict], h('span', { class: 'hz-find-c' }, ' · ' + r.cite.split(' · ').pop())),
      h('span', {}, prio(r.prio)),
      h('span', { class: 'td tn' + (r.by && daysTo(r.by) < 14 ? ' hz-soon' : '') }, r.by ? shortDate(r.by).replace(/ \d{4}$/, '') : '—')))));
}

/* the same document in other updates: one place to see everything that touches it */
function alsoIn(u, r) {
  const key = (x) => `${x.ref?.kind}:${x.ref?.id}:${x.ref?.doc || ''}`;
  const hits = UPDATES.filter(o => o.id !== u.id && o.st !== 'archived').flatMap(o => allRows(o.id).filter(x => key(x) === key(r) && x.st === 'open').map(x => [o, x]));
  if (!hits.length) return null;
  return h('section', { class: 'hz-sib hz-also' }, h('h2', { class: 'rqv-h' }, 'Also in other updates'),
    ...hits.map(([o, x]) => h('button', { class: 'hz-sib-r', type: 'button', onclick: () => { useImpact(o.id); openDoc(x.id); } },
      h('span', { class: 'tile', 'aria-hidden': 'true' }), h('span', { class: 'hz-sib-n' }, nameOf(o)), prio(x.prio),
      h('span', { class: 'hz-sib-w' + (x.assignee ? '' : ' is-none') }, x.assignee ? avatar(x.assignee, 'pb-av hz-sib-av') : null, x.assignee || 'Unassigned'))));
}

/* Documents and Activity, as a request's tabs (the underline slides to the one you are on) */
function sectionTabs(u) {
  const T = [['docs', 'Documents', allRows(u.id).length], ['activity', 'Activity', actOf(u).length]];
  const ink = h('span', { class: 'br-ink', 'aria-hidden': 'true' });
  const btns = T.map(([k, l, c]) => h('button', { class: 'br-tab', type: 'button', role: 'tab', 'data-k': k, 'aria-selected': String((state.utab || 'docs') === k),
    onclick: () => { state.utab = k; state.sel = new Set(); paint(); } }, l, h('span', { class: 'rqp-tab-n' }, String(c))));
  const bar = h('div', { class: 'br-tabs hz-tabs', role: 'tablist' }, ...btns, ink);
  requestAnimationFrame(() => { const on = btns.find(b => b.getAttribute('aria-selected') === 'true'); if (on?.offsetWidth) { ink.style.setProperty('--w', on.offsetWidth + 'px'); ink.style.setProperty('--x', on.offsetLeft + 'px'); } });
  return bar;
}
function howDialog() {
  dialog('How priority is set', [
    h('p', { class: 'how-n' }, 'Clavia works out one priority for each document from the rule below. The update takes the highest of them.'),
    h('div', { class: 'how' },
      h('div', {}, prio('urgent'), h('span', {}, 'The other side has to agree, and the change has to start within 60 days to land before the law applies. Signed contracts, soonest first.')),
      h('div', {}, prio('high'), h('span', {}, 'Our own paper or a live negotiation is off the new position. Nothing breaks today, but every new deal would repeat the problem.')),
      h('div', {}, prio('low'), h('span', {}, 'Already compliant, or nothing to change.'))),
    h('p', { class: 'how-n' }, 'You can change any document’s priority from its panel. It changes only your view, and Clavia’s priority stays shown beside yours.'),
],
    (close) => [h('button', { class: 'pb-btn', type: 'button', onclick: close }, 'Close')]);
}

function stageDrop() {
  const label = state.stage === 'all' ? 'All stages' : STAGE[state.stage];
  const opts = [['all', 'All stages', ROWS.length], ...Object.entries(STAGE).map(([k, l]) => [k, l, ROWS.filter(r => r.stage === k).length])];
  return h('div', { class: 'mx-drop' },
    h('button', { class: 'mx-drop-b', type: 'button', 'aria-expanded': String(state.pop === 'stage'), 'aria-haspopup': 'true', onclick: (e) => { e.stopPropagation(); state.pop = state.pop === 'stage' ? false : 'stage'; paint(); } },
      'Stage', h('b', {}, label), h('span', { html: svg('<path d="m4 6 4 4 4-4"/>'), style: 'display:grid' })),
    state.pop === 'stage' ? h('div', { class: 'mx-pop', role: 'menu' }, ...opts.map(([k, l, n]) => h('button', { type: 'button', role: 'menuitemradio', 'aria-checked': String(state.stage === k),
      onclick: (e) => { e.stopPropagation(); state.stage = k; state.pop = false; try { localStorage.setItem('clavia-ri-stage', k); } catch (er) {} paint(); } }, h('span', { class: 'bx' }), l, h('span', { class: 'n tn' }, String(n))))) : null);
}

/* your priority: Clavia sets it, you can change it for your own view; Clavia's stays visible */
/* the priorities you changed are kept in this browser */
function saveMine() { try { localStorage.setItem('clavia-ri-mine', JSON.stringify({ prio: Object.fromEntries(Object.values(IMPACT).flatMap(I => I.rows).filter(r => r.clavia).map(r => [r.id, r.prio])) })); } catch (e) {} }
function changePrio(anchor, r) {
  menuAt(anchor, Object.entries(PRIO).map(([k, [l]]) => ({ label: k === (r.clavia || r.prio) ? `${l} · Clavia’s` : l, tick: r.prio === k, run: () => {
    if (r.prio === k) return; const was = [r.prio, r.clavia], U = UPDATES.find(x => x.id === state.impact), wu = U?.prio;
    if (U) log(U, { what: `changed the priority to ${l} on`, refs: [r.id] });
    r.clavia ||= r.prio; r.prio = k; if (r.clavia === k) r.clavia = null; if (U) U.prio = overall(); saveMine(); paint();
    toast(`${shortN(r)} is ${l.toLowerCase()} priority for you`, { label: 'Undo', run: () => { [r.prio, r.clavia] = was; if (U) U.prio = wu; saveMine(); paint(); } }); } })));
}
const shortN = (r) => r.name.replace(/\.(docx|pdf)$/, '');
const byLine = (r) => r.done ? 'Already complies' : r.by ? `Due ${new Date(r.by + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}` : r.prio === 'low' ? 'No change needed' : 'Before the next deal';
/* ── who is on the other side of a document ──
   For a document in an Intake request it is the request's counterparty, as Intake records it; a
   template, a playbook or a Vault file is our own paper, with no one on the other side. */
const partyOf = (r) => {
  const ref = r.ref || {};
  if (ref.kind === 'request' && typeof mxIntake === 'function') { const R = mxIntake().find(x => x.id === ref.id); if (R?.counterparty) return R.counterparty; }
  return r.party || null;
};
function groupDrop() {
  if (hzState.group == null) { try { hzState.group = localStorage.getItem('clavia-ri-group') === 'party' ? 'party' : 'none'; } catch (e) { hzState.group = 'none'; } }
  const G = [['none', 'None'], ['party', 'Counterparty']], cur = hzState.group;
  return h('div', { class: 'mx-drop hz-gdrop' },
    h('button', { class: 'mx-drop-b', type: 'button', 'aria-expanded': String(state.pop === 'group'), 'aria-haspopup': 'true', onclick: (e) => { e.stopPropagation(); state.pop = state.pop === 'group' ? false : 'group'; paint(); } },
      'Group by', h('b', {}, G.find(g => g[0] === cur)[1]), h('span', { html: svg('<path d="m4 6 4 4 4-4"/>'), style: 'display:grid' })),
    state.pop === 'group' ? h('div', { class: 'mx-pop', role: 'menu' }, ...G.map(([k, l]) => h('button', { type: 'button', role: 'menuitemradio', 'aria-checked': String(cur === k),
      onclick: (e) => { e.stopPropagation(); hzState.group = k; state.pop = false; try { localStorage.setItem('clavia-ri-group', k); } catch (er) {} paint(); } }, h('span', { class: 'bx' }), l, h('span', {})))) : null);
}

function docsTable(list) {
  const order = { urgent: 0, high: 1, low: 2 }, vorder = { bad: 0, gap: 1, ok: 2 };
  const big = allRows().length > MANY;
  const rows = list.filter(r => !big || state.stage === 'all' || r.stage === state.stage).slice().sort((a, b) => order[a.prio] - order[b.prio] || (a.by || '9').localeCompare(b.by || '9'));
  const sel = state.sel ||= new Set(), all = rows.length && rows.every(r => sel.has(r.id));
  const TICK = '<svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 8.3 2.6 2.6L12 5.4"/></svg>';
  /* Clavia's tick box (.mx-em-check): a fine grey edge, forest with a white tick when on */
  const box = (on, label, flip, part) => h('button', { class: 'mx-em-check' + (part ? ' is-part' : ''), type: 'button', role: 'checkbox', 'aria-checked': part ? 'mixed' : String(on), 'aria-label': label, html: on ? TICK : part ? '<svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4.5 8h7"/></svg>' : '',
    onclick: (e) => { e.stopPropagation(); flip(); paint(); } });
  if (!rows.length) return h('p', { class: 'ud-none hz-none' }, state.dtab === 'done' ? 'Nothing completed yet.' : 'Nothing open. Every document is completed.');
  const rowEl = (r, inGroup) => h('div', { class: 'pb-tr pb-row' + (inGroup ? ' in-grp' : '') + (state.open === r.id ? ' is-open' : '') + (sel.has(r.id) ? ' is-sel' : '') + (r.st !== 'open' ? ' is-done' : ''), role: 'row', tabindex: '0', onclick: () => openRow(r.id), onkeydown: (e) => { if (e.key === 'Enter') { e.preventDefault(); openRow(r.id); } } },
    h('span', {}, box(sel.has(r.id), `Select ${shortN(r)}`, () => { sel.has(r.id) ? sel.delete(r.id) : sel.add(r.id); })),
    /* the name, and one grey line: where it lives in Clavia and how far the deal has got */
    h('span', { class: 'doc' }, h('span', { class: 'tile', 'aria-hidden': 'true' }), h('span', { class: 'doc-n' }, h('b', {}, r.name),
      h('span', {}, r.st === 'done' && r.proof ? r.proof : `${whereOf(r)} · ${STAGE[r.stage]}`))),
    /* why it is on the list: what Clavia found, and where in the document */
    h('span', { class: 'vd hz-find ' + r.verdict }, h('i'), VERDICT[r.verdict], h('span', { class: 'hz-find-c' }, ' · ' + r.cite.split(' · ').pop())),
    h('span', {}, h('button', { class: 'hz-prio-cell', type: 'button', 'aria-haspopup': 'menu', 'aria-label': `Priority ${PRIO[r.prio][0]}. Change`,
      'data-tip': r.clavia && r.clavia !== r.prio ? `Changed by you (Clavia: ${PRIO[r.clavia][0]})` : 'Change Priority',
      onclick: (e) => { e.stopPropagation(); changePrio(e.currentTarget, r); } }, prio(r.prio), h('span', { class: 'rqv-chev', html: DUE_CHEV }))),
    h('span', {}, dueBtn(r)),
    h('span', {}, assigneeBtn(r)),
    h('span', {}, h('button', { class: 'pb-row-more', type: 'button', 'aria-label': `More actions for ${shortN(r)}`, 'data-tip': 'More Actions', html: DOTS,
      onclick: (e) => { e.stopPropagation(); docMenu(e.currentTarget, r); } })));
  /* by counterparty: one row per company on the other side, the most pressing first, our own paper last;
     the row sums up its documents and acts on all of them (assign, due date, complete) */
  const groupRows = () => {
    const by = new Map();
    for (const r of rows) { const p = partyOf(r) || ''; (by.get(p) || by.set(p, []).get(p)).push(r); }
    const G = [...by.entries()].sort(([a, x], [b, y]) => (!a) - (!b) || Math.min(...x.map(r => order[r.prio])) - Math.min(...y.map(r => order[r.prio])) || y.length - x.length || a.localeCompare(b));
    const fold = hzState.gfold ||= {};
    return G.flatMap(([party, rs]) => {
      const key = party || '—', shut = !!fold[key], name = party || 'Our own paper';
      const on = rs.every(r => sel.has(r.id)), some = !on && rs.some(r => sel.has(r.id));
      const worst = rs.slice().sort((a, b) => vorder[a.verdict] - vorder[b.verdict])[0], top = rs.slice().sort((a, b) => order[a.prio] - order[b.prio])[0];
      const due = rs.filter(r => r.by && r.st === 'open').map(r => r.by).sort()[0];
      const people = [...new Set(rs.map(r => r.assignee).filter(Boolean))];
      const issues = rs.filter(r => r.verdict !== 'ok').length;
      const head = h('div', { class: 'pb-tr hz-grp' + (shut ? ' is-folded' : ''), role: 'row', tabindex: '0', 'aria-expanded': String(!shut),
        onclick: () => { fold[key] = !shut; paint(); }, onkeydown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fold[key] = !shut; paint(); } } },
        h('span', {}, box(on, `Select ${name}`, () => { if (on) rs.forEach(r => sel.delete(r.id)); else rs.forEach(r => sel.add(r.id)); }, some)),
        h('span', { class: 'hz-grp-t' }, h('span', { class: 'hz-grp-c', html: svg('<path d="m6 4 4 4-4 4"/>') }),
          h('span', { class: 'hz-grp-n' }, h('b', {}, name), h('span', {}, party ? `${rs.length} ${rs.length === 1 ? 'document' : 'documents'} · ${[...new Set(rs.map(whereOf))].join(', ')}` : `${rs.length} ${rs.length === 1 ? 'document' : 'documents'} · templates and playbooks`))),
        h('span', { class: 'vd hz-find ' + worst.verdict }, h('i'), issues ? `${issues} to change` : 'All compliant'),
        h('span', {}, prio(top.prio)),
        h('span', { class: 'td tn hz-due-g' + (due && daysTo(due) < 14 ? ' hz-soon' : '') }, due ? shortDate(due).replace(/ \d{4}$/, '') : '—'),
        h('span', { class: 'hz-grp-who' }, people.length ? [h('span', { class: 'hz-faces' }, ...people.slice(0, 3).map(n => avatar(n, 'pb-av hz-face'))), people.length === 1 ? people[0] : `${people.length} people`] : h('span', { class: 'mx-none' }, 'Unassigned')),
        h('span', {}, h('button', { class: 'pb-row-more', type: 'button', 'aria-label': `More actions for ${name}`, 'data-tip': 'More Actions', html: DOTS,
          onclick: (e) => { e.stopPropagation(); const anchor = e.currentTarget; menuAt(anchor, [
            { label: `Assign all ${rs.length}`, icon: 'person', run: () => pickAssignee(anchor, rs) },
            { label: 'Set Due Date for All', icon: 'calendar', run: () => pickDue(anchor.closest('.hz-grp')?.querySelector('.hz-due-g') || anchor, rs) },
            rs.some(r => r.st === 'open') ? { rule: true } : null,
            rs.some(r => r.st === 'open') ? { label: 'Mark All as Completed', icon: 'use', run: () => markDone(rs) } : null]); } })));
      return [head, ...(shut ? [] : rs.map(r => rowEl(r, true)))];
    });
  };
  if (hzState.group == null) { try { hzState.group = localStorage.getItem('clavia-ri-group') === 'party' ? 'party' : 'none'; } catch (e) { hzState.group = 'none'; } }
  const grouped = big && hzState.group === 'party';
  return h('div', { class: 'tbl-x' }, h('div', { class: 'dtbl' + (sel.size ? ' has-sel' : '') + (grouped ? ' is-grouped' : ''), role: 'table' },
    h('div', { class: 'pb-tr pb-thead', role: 'row' },
      h('span', {}, box(all, 'Select all', () => { if (all) rows.forEach(r => sel.delete(r.id)); else rows.forEach(r => sel.add(r.id)); })),
      ...[grouped ? 'Counterparty and documents' : 'Document', 'Finding', 'Priority', 'Due', 'Assigned to', ''].map(t => h('span', { class: 'pb-th', role: 'columnheader' }, t))),
    ...(grouped ? groupRows() : rows.map(r => rowEl(r)))));
}
/* the bar above the documents: Open · Completed, or, with any ticked, what to do with them.
   Group by and Stage show only past MANY documents; below that the list is short enough to read. */
const MANY = 10;
function docsBar(u) {
  const all = allRows(u.id), sel = state.sel ||= new Set(), picked = all.filter(r => sel.has(r.id));
  if (picked.length) return h('div', { class: 'pb-bar-list hz-bulk', role: 'toolbar', 'aria-label': 'Selected documents' },
    h('span', { class: 'hz-bulk-n tn' }, `${picked.length} selected`),
    h('button', { class: 'pb-btn sm', type: 'button', 'aria-haspopup': 'listbox', onclick: (e) => { e.stopPropagation(); pickAssignee(e.currentTarget, picked); } }, 'Assign'),
    h('button', { class: 'pb-btn sm', type: 'button', onclick: (e) => { e.stopPropagation(); pickDue(e.currentTarget, picked); } }, 'Set Due Date'),
    picked.some(r => r.st === 'open') ? h('button', { class: 'pb-btn sm', type: 'button', onclick: () => markDone(picked) }, 'Mark as Completed') : null,
    picked.some(r => r.st !== 'open') ? h('button', { class: 'pb-btn sm', type: 'button', onclick: () => setDocs(picked.filter(r => r.st !== 'open'), 'open') }, 'Reopen') : null,
    h('button', { class: 'sx-link hz-bulk-x', type: 'button', onclick: () => { state.sel = new Set(); paint(); } }, 'Clear'));
  const n = (k) => all.filter(r => r.st === k).length;
  return h('div', { class: 'pb-bar-list' },
    h('div', { class: 'pb-tabs', role: 'tablist' }, ...[['open', 'Open'], ['done', 'Completed']].map(([k, l]) =>
      h('button', { class: 'pb-tab', role: 'tab', type: 'button', 'aria-selected': String((state.dtab === 'done' ? 'done' : 'open') === k), onclick: () => { state.dtab = k; state.sel = new Set(); paint(); } }, l, h('span', { class: 'pb-tab-n' }, String(n(k)))))),
    all.length > MANY ? h('div', { class: 'hz-drops' }, groupDrop(), stageDrop()) : null);
}

/* ── the update's activity, drawn as Intake draws a request's ──
   One thin thread down the faces, a day at a time, newest first. Each line says who did what in
   plain words; what changed is shown as itself (a status as its ring and name, a priority in its
   colour, a person as their face). Documents are named, not linked: the activity is a record, and
   documents open from the list. The same person doing several things in a row is said once. What
   someone wrote follows underneath in the same type. A comment box sits on top. */
function activityView(u, docId) {
  const list = actOf(u).filter(a => !docId || (a.refs || []).includes(docId)).slice().reverse();
  const ST = DOC_ST();
  const dayOf = (iso) => { const d = new Date(iso), t = new Date(), y = new Date(t); y.setDate(t.getDate() - 1); const k = (x) => x.toDateString();
    return k(d) === k(t) ? 'Today' : k(d) === k(y) ? 'Yesterday' : d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }); };
  const time = (iso) => new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const doc = (id) => h('span', { class: 'hz-act-d' }, id === docId ? 'this document' : docName(id));
  const docs = (refs) => refs.length === 1 ? [doc(refs[0])] : refs.length && docId && refs.includes(docId) ? [doc(docId), h('span', {}, ` and ${refs.length - 1} more`)]
    : [h('span', { class: 'hz-act-d' }, `${refs.length} documents`)];
  const stage = (k) => h('span', { class: 'rqx-stage' }, h('span', { class: 'rqx-stage-ic', html: ST[k].svg }), ST[k].label);
  const stage2 = (k) => { const v = UST()[k] || UST().open; return h('span', { class: 'rqx-stage' }, h('span', { class: 'rqx-stage-ic', html: v.svg }), v.label); };
  const person = (n) => h('span', { class: 'hz-act-p' }, avatar(n, 'rqx-fc'), n === ME() ? 'you' : n);
  /* what kind of thing happened, and the words for it */
  const read = (a) => {
    const refs = a.refs || [], w = a.what || '';
    if (a.who === 'Clavia') return { ev: 'clavia', line: [w] };
    if (/^archived this update/.test(w)) return { ev: 'status', said: !!a.text, line: ['moved this update to ', stage2('archived')] };
    if (/^unarchived this update/.test(w)) return { ev: 'status', line: ['unarchived this update'] };
    if (/^removed from this update/.test(w)) return { ev: 'status', line: ['deleted ', ...docs(refs), ' from this update'] };
    if (/^noted what fixed/.test(w)) return { ev: 'event', said: true, line: ['noted what fixed ', ...docs(refs)] };
    if (/^commented/.test(w)) return { ev: 'note', said: true, line: ['commented', ...(refs.length && !docId ? [' on ', ...docs(refs)] : [])] };
    if (/^asked Clavia/.test(w)) return { ev: 'note', said: true, line: ['asked Clavia', ...(refs.length && !docId ? [' about ', ...docs(refs)] : [])] };
    if (/^assigned/.test(w)) return { ev: 'assign', line: a.to === a.who ? ['took on ', ...docs(refs)] : ['assigned ', ...docs(refs), ' to ', person(a.to)] };
    if (/^unassigned/.test(w)) return { ev: 'assign', line: ['took the assignee off ', ...docs(refs)] };
    if (/^marked as done/.test(w)) return { ev: 'status', said: !!a.text, line: ['moved ', ...docs(refs), ' to ', stage('done')] };
    if (/^reopened/.test(w)) return { ev: 'status', line: ['moved ', ...docs(refs), ' back to ', stage('open')] };
    if (/^removed the due date/.test(w)) return { ev: 'status', line: ['removed the due date of ', ...docs(refs)] };
    if (/^set the due date/.test(w)) return { ev: 'status', line: ['set the due date of ', ...docs(refs), ' to ', h('span', { class: 'hz-act-d' }, a.date ? shortDate(a.date) : '')] };
    const pr = /^changed the priority to (\w+)/.exec(w);
    if (pr) { const k = Object.keys(PRIO).find(x => PRIO[x][0] === pr[1]) || 'low'; return { ev: 'event', line: ['set ', ...docs(refs), ' to ', h('span', { class: 'pr ' + k }, pr[1]), ' priority'] }; }
    return { ev: 'event', said: !!a.text, line: [w] };
  };
  const out = []; let day = null, prev = null;
  list.forEach((a, n) => {
    const d = dayOf(a.when); if (d !== day) { day = d; prev = null; out.push(h('div', { class: 'rqa-day' }, d)); }
    const e = read(a), next = list[n + 1];
    const cont = prev && prev.who === a.who && !prev.said && !e.said;
    const last = !next || dayOf(next.when) !== d;
    const face = a.who === 'Clavia'
      ? h('span', { class: 'rqx-av rqx-av--clavia' }, typeof quillEl === 'function' ? quillEl('static', { cls: 'rqx-q' }) : h('img', { src: QUILL, alt: '', class: 'rqx-q' }))
      : avatar(a.who, 'rqx-av');
    out.push(h('div', { class: 'rqx' + (cont ? ' is-cont' : '') + (last ? ' is-last' : '') + (e.said ? ' is-said' : '') + ' is-' + e.ev },
      h('span', { class: 'rqx-face' }, cont ? h('span', { class: 'rqx-pip' }) : face),
      h('div', { class: 'rqx-b' },
        h('div', { class: 'rqx-h' },
          h('span', { class: 'rqx-who' }, a.who === ME() ? 'You' : a.who), ' ',
          h('span', { class: 'rqx-what' }, ...e.line),
          e.via ? h('img', { class: 'rqx-via', src: `assets/brand/${e.via}.svg`, alt: '' }) : null,
          h('span', { class: 'rqx-time' }, time(a.when))),
        (a.refs || []).length > 1 && !docId && a.who !== 'Clavia' ? h('div', { class: 'hz-act-list' }, a.refs.map(docName).join(' · ')) : null,
        a.text ? h('div', { class: 'rqx-t' + (/^commented/.test(a.what) ? ' is-note' : '') }, a.text) : null)));
    prev = { who: a.who, said: e.said };
  });
  const ta = h('textarea', { class: 'mx-reply-in', rows: '1', placeholder: 'Add a comment', 'aria-label': 'Add a comment',
    oninput: () => { send.disabled = !ta.value.trim(); },
    onkeydown: (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); post(); } } });
  const send = h('button', { class: 'mx-rq-send', type: 'button', disabled: true, 'aria-label': 'Send', onclick: () => post(),
    html: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5.5 11.5 12 5l6.5 6.5"/></svg>' });
  const post = () => { const t = ta.value.trim(); if (!t) return; log(u, { what: docId ? 'commented on' : 'commented', refs: docId ? [docId] : undefined, text: t[0].toUpperCase() + t.slice(1) }); paint(); setTimeout(() => page.querySelector('.hz-act .mx-reply-in')?.focus(), 0); };
  return h('section', { class: 'hz-act' },
    h('div', { class: 'mx-rq-composer rqx-compose' }, ta, send),
    out.length ? h('div', { class: 'rqa' }, ...out) : h('p', { class: 'ud-none' }, 'Nothing has happened here yet.'));
}
function openRow(id) { openDoc(id); }

/* ── a document, in the pane ── */

/* ── Horizon: the watches (from Clavia's seed) and every update they found ── */
const WATCHES = [
  { id: 'eu-data', name: 'EU data and cloud rules', owner: 'Grace Coleman', checked: 9, juris: [['🇪🇺', 'EU'], ['🇮🇪', 'Ireland'], ['🇩🇪', 'Germany'], ['🇫🇷', 'France']], topics: ['Cloud contracts', 'Data protection', 'Cybersecurity', 'Financial services customers'],
    sources: ['EUR-Lex', 'European Commission', 'EDPB', 'ENISA', 'Irish DPC'], intent: 'Changes to EU data, cloud and cyber law that affect a UK SaaS company selling to EU businesses.' },
  { id: 'ai', name: 'AI rules for our product', owner: 'Grace Coleman', checked: 14, juris: [['🇪🇺', 'EU'], ['🇬🇧', 'UK'], ['🇺🇸', 'California'], ['🇺🇸', 'Colorado']], topics: ['AI transparency', 'Automated decisions', 'General-purpose AI models'],
    sources: ['EU AI Office', 'EUR-Lex', 'CPPA', 'ICO', 'Colorado AG'], intent: 'Rules on AI that apply to forecasting features built on third-party models.' },
  { id: 'uk-data', name: 'UK data reform', owner: 'Roger Bennett', checked: 4, juris: [['🇬🇧', 'UK']], topics: ['Data protection', 'International transfers', 'Cookies'],
    sources: ['legislation.gov.uk', 'ICO', 'DSIT'], intent: 'The Data (Use and Access) Act coming into force, and ICO guidance that changes our DPA.' },
  { id: 'gulf', name: 'Gulf privacy', owner: 'Matt Rivera', checked: 22, juris: [['🇦🇪', 'United Arab Emirates'], ['🇸🇦', 'Saudi Arabia'], ['🇶🇦', 'Qatar']], topics: ['Data protection', 'Cross-border transfers', 'Data localisation'],
    sources: ['UAE Data Office', 'SDAIA', 'Qatar NCSA'], intent: 'Data protection rules in the UAE and Saudi Arabia that affect our reseller programme.' },
];
const FLAG = { EU: '🇪🇺', UK: '🇬🇧', California: '🇺🇸', 'United Arab Emirates': '🇦🇪', Qatar: '🇶🇦', Ireland: '🇮🇪' };
/* priority and documents per update, read the same way as HZ-231's documents */
const UPDATES = [
  { id: 'HZ-231', st: 'open', watch: 'eu-data', days: 6, title: 'Data Act: switching charges end on 12 January 2027', lede: 'From 12 January 2027 a cloud provider may not charge a customer anything for switching to another provider or taking its data out.', prio: 'urgent', docs: 7, urgentDocs: 3, type: 'Regulation', juris: 'EU', next: '2027-01-12', src: 'eur-lex.europa.eu' },
  { id: 'HZ-238', st: 'open', unread: true, watch: 'uk-data', days: 1, title: 'Data (Use and Access) Act: more provisions in force from 1 December', lede: 'The latest commencement regulations bring the recognised legitimate interests basis and the new complaints rules into force on 1 December 2026.', prio: 'low', docs: 1, type: 'Regulations', juris: 'UK', next: '2026-12-01', src: 'legislation.gov.uk' },
  { id: 'HZ-237', st: 'open', unread: true, watch: 'ai', days: 2, title: 'AI Act: Commission consults on transparency guidelines for AI-generated content', lede: 'Draft guidelines on how providers and deployers should mark AI-generated content and tell people they are dealing with an AI system.', prio: 'low', docs: 1, type: 'Consultation', juris: 'EU', next: '2026-11-21', src: 'digital-strategy.ec.europa.eu' },
  { id: 'HZ-236', st: 'open', unread: true, watch: 'gulf', days: 3, title: 'UAE: Data Office publishes guidance on cross-border transfers under the PDPL', lede: 'Guidance on when personal data can leave the UAE, and the contract terms expected where there is no adequacy decision.', prio: 'high', docs: 3, type: 'Guidance', juris: 'United Arab Emirates', next: null, src: 'u.ae' },
  { id: 'HZ-235', st: 'open', unread: true, watch: 'eu-data', days: 4, title: 'Cyber Resilience Act: Commission guidance on reporting actively exploited vulnerabilities', lede: 'Guidance on the 24-hour early warning and 72-hour notification for manufacturers of products with digital elements.', prio: 'low', docs: 0, type: 'Guidance', juris: 'EU', next: null, src: 'commission.europa.eu' },
  { id: 'HZ-233', st: 'open', unread: true, watch: 'uk-data', days: 5, title: 'ICO consults on updated guidance on international transfers', lede: 'Updated guidance on transfer risk assessments and the UK addendum to the EU SCCs.', prio: 'low', docs: 1, type: 'Consultation', juris: 'UK', next: '2026-11-28', src: 'ico.org.uk' },
  { id: 'HZ-234', st: 'open', watch: 'ai', days: 9, title: 'California: automated decision-making rules — risk assessments due from 2027', lede: 'The CPPA’s regulations on automated decision-making technology, risk assessments and cybersecurity audits phase in from January 2027.', prio: 'high', docs: 1, type: 'Regulations', juris: 'California', next: '2027-01-01', src: 'cppa.ca.gov' },
  { id: 'HZ-229', st: 'done', watch: 'eu-data', days: 32, title: 'DORA: register of information for ICT third-party providers', lede: 'Financial entities must keep a register of their ICT third-party arrangements and report it to their regulator.', prio: 'low', docs: 2, type: 'Implementing regulation', juris: 'EU', next: null, src: 'eur-lex.europa.eu' },
  { id: 'HZ-230', st: 'archived', archBy: 'Matt Rivera', why: 'We have no customers or processing in Qatar.', watch: 'gulf', days: 18, title: 'Qatar: NCSA updates guidance on personal data privacy', lede: 'Updated guidance for controllers on notices and data subject rights.', prio: 'low', docs: 0, type: 'Guidance', juris: 'Qatar', next: null, src: 'ncsa.gov.qa' },
  { id: 'HZ-228', st: 'archived', archBy: 'Grace Coleman', why: 'We are below the size thresholds and not in a listed sector.', watch: 'eu-data', days: 25, title: 'Ireland: NIS2 transposition bill published', lede: 'The National Cyber Security Bill brings NIS2 into Irish law.', prio: 'low', docs: 0, type: 'Bill', juris: 'Ireland', next: null, src: 'gov.ie' },
];
/* what people call an update: a few words on what changed, never its number (HZ-231 lives only in the address) */
const SHORT = { 'HZ-231': 'Data Act switching charges', 'HZ-238': 'UK data reform, 1 December', 'HZ-237': 'AI Act transparency guidelines', 'HZ-236': 'UAE data transfers',
  'HZ-235': 'Cyber Resilience Act reporting', 'HZ-233': 'ICO transfer guidance', 'HZ-234': 'California automated decisions', 'HZ-229': 'DORA ICT register',
  'HZ-230': 'Qatar privacy guidance', 'HZ-228': 'Ireland NIS2 bill', 'HZ-243': 'Ireland pay transparency bill', 'HZ-242': 'Germany pay transparency reform', 'HZ-241': 'Italy pay transparency decree' };
const nameOf = (u) => u.short || SHORT[u.id] || u.title.split(':')[0];
const watchOf = (id) => WATCHES.find(w => w.id === id);
const agoD = (d) => d === 1 ? 'yesterday' : `${d} days ago`;
const shortDate = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const openUpdate = (u) => { if (u.unread) { u.unread = false; saveWork(); } useImpact(u.id); state.utab = 'docs'; state.dtab = 'open'; state.sel = new Set(); go('impact'); };
const hzState = { tab: 'review', wtab: 'all', cover: false, wk: 0, shut: false };

function updatesTable(list, opts = {}) {
  const order = { urgent: 0, high: 1, low: 2 };
  const rows = list.slice().sort((a, b) => order[a.prio] - order[b.prio] || a.days - b.days);
  return h('div', { class: 'tbl-x' }, h('div', { class: 'htbl', role: 'table' },
    h('div', { class: 'pb-tr pb-thead', role: 'row' }, ...['Update', 'Priority', 'Documents', 'Type', 'Jurisdiction', 'Next date'].map(t => h('span', { class: 'pb-th', role: 'columnheader' }, t))),
    rows.length ? rows.map(u => h('div', { class: 'pb-tr pb-row' + (u.unread ? ' is-unread' : ''), role: 'row', tabindex: '0', onclick: () => openUpdate(u), onkeydown: (e) => { if (e.key === 'Enter') openUpdate(u); } },
      h('span', { class: 'hz-cell-u' }, h('span', { class: 'hz-cell-t', title: u.title }, u.title), h('span', { class: 'hz-cell-l', title: u.lede }, u.lede),
        h('span', { class: 'hz-cell-s' }, agoD(u.days), h('span', {}, u.src), opts.watch === false ? null : h('span', { class: 'w' }, watchOf(u.watch).name))),
      prio(u.prio),
      (() => { const rs = IMPACT[u.id] ? allRows(u.id) : null, n = rs ? rs.length : u.docs, ur = rs ? rs.filter(x => x.prio === 'urgent' && !x.done).length : 0;
        return h('span', { class: 'hz-docs tn' }, n ? `${n} touched` : h('span', { class: 'mx-none' }, 'None'), ur ? h('small', {}, `${ur} high priority`) : null); })(),
      h('span', {}, h('span', { class: 'hz-tag' }, u.type)),
      h('span', { class: 'hz-flag' }, h('span', { 'aria-hidden': 'true' }, FLAG[u.juris] || '🌐'), u.juris),
      u.next && daysTo(u.next) >= 0 ? h('span', { class: 'hz-date tn' }, shortDate(u.next)) : h('span', { class: 'mx-none' }, '—')))
      : h('div', { class: 'pb-empty' }, 'Nothing here. Horizon checks every hour.')));
}

function horizonView() {
  const open = (w) => UPDATES.filter(u => u.watch === w.id && u.st === 'open');
  const mineN = UPDATES.filter(u => u.st === 'open').flatMap(u => allRows(u.id)).filter(r => r.assignee === ME() && r.st === 'open').length;
  const tab = hzState.home || 'watches';
  return [
    h('header', { class: 'lib-head' }, h('h1', { class: 'view-title' }, 'Horizon'),
      h('div', { class: 'mx-head-ctas' }, h('button', { class: 'pb-btn primary', type: 'button', onclick: () => go('new') }, '+ New Watch'))),
    h('div', { class: 'pb-bar-list hz-home-tabs' }, h('div', { class: 'pb-tabs', role: 'tablist' }, ...[['watches', 'Watches', WATCHES.length], ['mine', 'Assigned to me', mineN]].map(([k, l, c]) =>
      h('button', { class: 'pb-tab', role: 'tab', type: 'button', 'aria-selected': String(tab === k), onclick: () => { hzState.home = k; paint(); } }, l, h('span', { class: 'pb-tab-n' }, String(c)))))),
    tab === 'mine' ? myWork() :
h('div', { class: 'wcards' }, ...WATCHES.map(w => {
      const o = open(w), urg = o.filter(u => u.prio === 'urgent').length;
      return h('div', { class: 'wwrap' }, h('button', { class: 'wcard', type: 'button', onclick: () => { state.watch = w.id; hzState.wtab = 'all'; go('watch'); } },
        h('span', { class: 'wcard-ic', html: svg('<circle cx="8" cy="8" r="6.5"/><circle cx="8" cy="8" r="3.2"/><circle cx="8" cy="8" r=".6"/>') }),
        h('b', {}, w.name),
        h('span', { class: 'sc tn' }, `${w.topics.length} topics · ${w.sources.length} sources · ${w.juris.map(j => j[0]).filter((f, i, a) => a.indexOf(f) === i).join('')} ${w.juris.length} ${w.juris.length === 1 ? 'jurisdiction' : 'jurisdictions'}`),
        h('span', { class: 'ft' }, face(w.owner), w.owner.split(' ')[0], h('span', { class: 'n tn' + (urg ? ' u' : '') }, urg ? `${urg} high priority` : `${o.length} open`))),
        h('button', { class: 'wdots', type: 'button', 'aria-label': `More actions for ${w.name}`, title: 'More Actions', 'aria-expanded': String(state.wmenu === w.id), onclick: (e) => { e.stopPropagation(); state.wmenu = state.wmenu === w.id ? null : w.id; paint(); }, html: DOTS }),
        state.wmenu === w.id ? watchMenu(w, 'card') : null);
    })),
  ];
}

/* the weekly digest, as Harvey reads a scan: a headline, a cited paragraph, two counts */
const DIGEST = {
  'eu-data': [
    { head: 'Trellis Health’s order form charges 25% to leave early. From 12 January that fee can’t be charged.', body: [['The Data Act ends switching charges on 12 January 2027; Trellis Health’s order form, our MSA template and our SaaS playbook all need to change.', 'HZ-231'], ['The Commission’s Cyber Resilience Act guidance matters only if our connector agent counts as a product.', 'HZ-235']], fresh: 2, urgent: 1 },
    { head: 'DORA is done.', body: [['Our DPA template already gives banks the subprocessor and security details their register needs.', 'HZ-229']], fresh: 0, urgent: 0 }],
};
function digest(w) {
  const weeks = DIGEST[w.id] || [{ head: 'Nothing new that applies to Lumen this week.', body: [], fresh: 0, urgent: 0 }];
  const d = weeks[Math.min(hzState.wk, weeks.length - 1)];
  const cites = [];
  const cite = (id) => { let n = cites.indexOf(id) + 1; if (!n) { cites.push(id); n = cites.length; } return n; };
  return h('section', { class: 'hz-dg' + (hzState.shut ? ' is-shut' : '') },
    h('header', { class: 'hz-dg-h' }, h('span', { class: 'hz-dg-q' }, h('img', { src: QUILL, alt: '' })), h('span', { class: 'hz-dg-t' }, 'Weekly digest'),
      h('span', { class: 'hz-dg-wk' },
        h('button', { class: 'hz-dg-nav', type: 'button', 'aria-label': 'Earlier week', disabled: hzState.wk >= weeks.length - 1, onclick: () => { hzState.wk++; paint(); }, html: svg('<path d="M10 3.5 5.5 8l4.5 4.5"/>') }),
        h('span', {}, hzState.wk === 0 ? 'This week' : 'Last week'),
        h('button', { class: 'hz-dg-nav', type: 'button', 'aria-label': 'Later week', disabled: hzState.wk === 0, onclick: () => { hzState.wk--; paint(); }, html: svg('<path d="M6 3.5 10.5 8 6 12.5"/>') })),
      h('button', { class: 'hz-dg-fold', type: 'button', 'aria-label': hzState.shut ? 'Show digest' : 'Hide digest', onclick: () => { hzState.shut = !hzState.shut; paint(); }, html: svg('<path d="M4 10 8 6l4 4"/>') })),
    hzState.shut ? null : h('div', { class: 'hz-dg-b' },
      h('div', {}, h('p', { class: 'hz-dg-head' }, d.head),
        d.body.length ? h('p', { class: 'hz-dg-p' }, ...d.body.flatMap(([t, id]) => [t, ' ', h('button', { class: 'cite', type: 'button', title: UPDATES.find(u => u.id === id)?.title, onclick: () => openUpdate({ id }) }, String(cite(id))), ' '])) : null),
      h('div', { class: 'hz-dg-stats' }, h('div', { class: 'hz-dg-stat' }, h('b', {}, String(d.fresh)), h('span', {}, d.fresh === 1 ? 'New update' : 'New updates')),
        h('div', { class: 'hz-dg-stat' + (d.urgent ? ' u' : '') }, h('b', {}, String(d.urgent)), h('span', {}, 'Need action')))));
}

function watchView() {
  const w = watchOf(state.watch) || WATCHES[0];
  const mine = UPDATES.filter(u => u.watch === w.id);
  const WT = [['open', 'Open'], ['done', 'Completed'], ['archived', 'Archived']];
  if (!WT.some(([k]) => k === hzState.wtab)) hzState.wtab = (WT.find(([k]) => mine.some(u => u.st === k)) || WT[0])[0];
  const list = mine.filter(u => u.st === hzState.wtab);
  const flags = w.juris.map(j => j[0]).filter((f, i, a) => a.indexOf(f) === i).join('');
  return [
    h('div', { class: 'hz-bar' },
      h('button', { class: 'hz-back', type: 'button', 'aria-label': 'Back', onclick: () => go('horizon'), html: back() }),
      h('nav', { class: 'hz-crumbs', 'aria-label': 'Breadcrumb' }, h('button', { class: 'hz-crumb', type: 'button', onclick: () => go('horizon') }, 'Horizon'), h('span', { class: 'hz-sep' }, '›'), h('span', { class: 'hz-crumb is-here' }, w.name)),
      h('div', { class: 'hz-bar-r' }, h('span', { class: 'hz-bar-s tn' }, w.checked ? `Checked ${w.checked} min ago` : 'Checked just now'),
        h('button', { class: 'pb-btn', type: 'button', onclick: () => toast('Link copied. Anyone in Legal can open it.'), html: svg('<path d="M8 10V2.5M5 5.5l3-3 3 3M3 9v4h10V9"/>') + 'Share' }),
        h('button', { class: 'pb-btn', type: 'button', onclick: () => editCoverage(watchOf(state.watch)) }, 'Settings'),
        h('div', { class: 'bar-wrap' }, h('button', { class: 'pb-btn bar-dots', type: 'button', 'aria-label': 'More actions', title: 'More Actions', 'aria-expanded': String(state.wmenu === 'bar'), onclick: (e) => { e.stopPropagation(); state.wmenu = state.wmenu === 'bar' ? null : 'bar'; paint(); }, html: DOTS }),
          state.wmenu === 'bar' ? watchMenu(w, 'bar') : null))),
    h('header', { class: 'hz-whead' }, h('h1', { class: 'hz-title' }, w.name),
      h('button', { class: 'hz-scope tn', type: 'button', 'aria-expanded': String(hzState.cover), onclick: () => { hzState.cover = !hzState.cover; paint(); } },
        `${w.topics.length} topics · ${w.sources.length} sources · ${flags} ${w.juris.length} ${w.juris.length === 1 ? 'jurisdiction' : 'jurisdictions'}`)),
    hzState.cover ? h('section', { class: 'hz-cover' },
      h('div', {}, h('span', { class: 'k' }, 'What it watches for'), h('span', {}, w.intent)),
      h('div', {}, h('span', { class: 'k' }, 'Jurisdictions'), h('span', { class: 'hz-chips' }, ...w.juris.map(([f, n]) => h('span', { class: 'hz-chip' }, f + ' ' + n)))),
      h('div', {}, h('span', { class: 'k' }, 'Topics'), h('span', { class: 'hz-chips' }, ...w.topics.map(t => h('span', { class: 'hz-chip' }, t)))),
      h('div', {}, h('span', { class: 'k' }, 'Sources it reads'), h('span', {}, w.sources.join(' · ')))) : null,
    state.fresh === w.id ? h('div', { class: 'fresh' }, h('img', { src: QUILL, alt: '', style: 'filter:invert(1) brightness(.35)' }), 'Clavia chose this coverage from what you wrote. Change anything in Settings; it applies from the next check.') : null,
    digest(w),
    h('div', { class: 'sec-h' }, h('div', { class: 'pb-tabs', role: 'tablist' },
      ...WT.map(([k, l]) => h('button', { class: 'pb-tab', role: 'tab', type: 'button', 'aria-selected': String(hzState.wtab === k), onclick: () => { hzState.wtab = k; paint(); } }, l, h('span', { class: 'pb-tab-n' }, String(mine.filter(u => u.st === k).length)))))),
    updatesTable(list, { watch: false }),
  ];
}


/* ── what each update says, and why it matters to Lumen (Clavia's Horizon seed) ── */
const DETAIL = {
  'HZ-231': { sum: ['Since 12 September 2025, cloud contracts must let the customer switch provider on no more than two months’ notice, then a 30-day transition.', 'Until 12 January 2027 switching charges may only cover the provider’s own costs.', 'From 12 January 2027 no switching charges may be charged at all.'],
    why: 'We sell SaaS to customers in the EU, so the Data Act treats us as a provider of data processing services. A fee for leaving early counts as a switching charge, and customers must be able to switch on two months’ notice.' },
  'HZ-238': { sum: ['Controllers may rely on a list of recognised legitimate interests without a balancing test.', 'Controllers must offer a way to complain and acknowledge complaints within 30 days.'],
    why: 'We are a controller for employee data and our own marketing. As a processor, the complaints duty sits with customers, but they will expect our help.' },
  'HZ-237': { sum: ['The draft explains how to meet Article 50, including marking AI-generated text and images.', 'Comments close on 21 November 2026.'],
    why: 'Our forecasting features write text summaries for customers. If those count as AI-generated content shown to people, Article 50 marking may apply.' },
  'HZ-236': { sum: ['Transfers to countries without adequate protection need a contract with the protections the guidance sets out.', 'Resellers passing customer data to a foreign platform are named as an example.'],
    why: 'Gulf Systems resells our platform in the UAE and customer data is hosted in Ireland. The reseller terms in draft need the transfer protections.' },
  'HZ-235': { sum: ['Manufacturers must give an early warning within 24 hours of learning of an actively exploited vulnerability.', 'Reporting duties apply from 11 September 2026.'],
    why: 'Pure SaaS is mostly outside the Cyber Resilience Act, but our on-premise connector agent is software we place on the EU market.' },
  'HZ-233': { sum: ['The ICO proposes a simpler approach to transfer risk assessments.', 'Comments close on 28 November 2026.'],
    why: 'We use the UK addendum for sub-processors outside the UK. A simpler assessment could shorten our DPA annex.' },
  'HZ-234': { sum: ['Businesses using automated decision-making for significant decisions must give a pre-use notice and an opt-out.', 'The first risk assessments are due in 2027.'],
    why: 'We don’t make significant decisions about people, but two US customers use our forecasts in credit decisions and will ask what we provide.' },
  'HZ-229': { sum: ['Financial entities must keep a register of information on all ICT third-party contracts.', 'Customers will ask us for the details the register needs.'],
    why: 'Banks and insurers are a fifth of our customers. They need our details for their register and DORA terms in our contract.' },
  'HZ-230': { sum: ['Controllers must give clear privacy notices before collecting personal data.'], why: '' },
  'HZ-228': { sum: ['The bill sets out which entities are essential or important, and their reporting duties.'], why: '' },
};

function mailText(u, a) {
  const d = DETAIL[u.id] || { why: '' }, dd = u.next && daysTo(u.next) >= 0 ? shortDate(u.next) : null;
  const to = { 'Internal stakeholders': 'Legal and Compliance', 'Sales and account managers': 'Sales leadership', 'Leadership': 'the leadership team' }[a[0]] || 'the team';
  const hi = a[0] === 'Leadership' ? 'Hi all' : 'Hi everyone';
  const docs = allRows(u.id).filter(r => r.st === 'open' && r.verdict !== 'ok').map(r => `${shortN(r)} (${r.cite})`);
  let body = `${hi},\n\n${u.lede}\n\nWhy it matters to us: ${d.why}\n`;
  if (a[1] !== 'A short heads-up') {
    body += `\n${a[1] === 'Risk and who owns it' ? 'Where we are exposed' : 'What we need to do'}:\n` + (docs.length ? docs.map(n => `• ${n}`).join('\n') : '• Nothing in our documents today; we are watching for the final text.') + '\n';
    if (dd) body += `\nThe date to know is ${dd}.`;
    body += '\n';
  }
  body += `\nQuestions to Legal.\n\nRoger`;
  return { to, subj: `What this means for us: ${u.title}`, body };
}

/* ── Ask Clavia, about one update ──
   A chat docked beside the update, with it attached. Suggested questions are the ones this update
   raises; answers are read from the update and its documents, and every document named opens in its
   panel. Continue in New Chat takes the question to Clavia's chat with the update attached. */
const ASKS = {};
const docOf = (id) => ROWS.find(r => r.id === id);
function askQuestions(u) {
  const open = ROWS.filter(r => r.verdict !== 'ok' && !r.done), signed = open.filter(r => r.stage === 'signed');
  return [
    open.length ? ['first', 'Which documents should we fix first?'] : null,
    u.next && daysTo(u.next) >= 0 ? ['date', `What has to happen before ${shortDate(u.next)}?`] : null,
    signed.length ? ['signed', 'Do our signed contracts change on their own?'] : null,
    ['why', 'Why does this apply to us?'],
    ['mail', 'Draft an email to the team about this'],
    ROWS.length ? null : ['next', 'What should we watch for next?'],
  ].filter(Boolean);
}
function askIntent(q) {
  const t = q.toLowerCase();
  return /email|mail|draft|write to|let .* know/.test(t) ? 'mail' : /first|priorit|urgent|which doc|start/.test(t) ? 'first' : /signed|automatic|on their own|amend|counterpart/.test(t) ? 'signed'
    : /date|deadline|when|before|by |time|days/.test(t) ? 'date' : /why|apply|matter|affect|relevant/.test(t) ? 'why' : /next|watch|final/.test(t) ? 'next' : 'any';
}
/* an answer is a list of blocks: ['p', parts] or ['ul', [parts…]]; a part is text or ['doc', id] */
function askAnswer(u, intent) {
  const d = DETAIL[u.id] || { sum: [u.lede], why: '' }, order = { urgent: 0, high: 1, low: 2 };
  const open = ROWS.filter(r => r.verdict !== 'ok' && !r.done).sort((a, b) => order[a.prio] - order[b.prio] || (a.by || '9').localeCompare(b.by || '9'));
  const name = u.title.split(':')[0];
  if (intent === 'first' && open.length) {
    const top = open.slice(0, 4), rest = ROWS.length - top.length;
    return [['p', ['Start with the documents where the other side has to agree, because they take longest. In order:']],
      ['ul', top.map(r => [['doc', r.id], ` · ${PRIO[r.prio][0]}, ${byLine(r).replace(/^./, (c) => c.toLowerCase())}. ${r.next}${r.assignee ? `, with ${r.assignee.split(' ')[0]}` : ', not assigned yet'}.`])],
      rest ? ['p', [`The other ${rest} ${rest === 1 ? 'document is' : 'documents are'} lower priority, already compliant or done.`]] : null].filter(Boolean);
  }
  if (intent === 'date' && u.next && daysTo(u.next) >= 0) {
    const dated = open.filter(r => r.by).sort((a, b) => a.by.localeCompare(b.by)), ours = open.filter(r => !r.by && r.stage === 'paper'), live = open.filter(r => !r.by && r.stage === 'neg');
    const names = (rs) => rs.flatMap((r, i) => [i ? (i === rs.length - 1 ? ' and ' : ', ') : '', ['doc', r.id]]);
    return [['p', [`${name} applies from ${shortDate(u.next)}, ${daysTo(u.next)} days from now.`, dated.length ? ' What has a date of its own before then:' : '']],
      dated.length ? ['ul', dated.map(r => [['doc', r.id], ` by ${shortDate(r.by)}: ${r.next}.`])] : null,
      ours.length ? ['p', ['Our own paper should change before the next deal: ', ...names(ours), '.']] : null,
      live.length ? ['p', [live.length === 1 ? 'The live negotiation changes in our next turn: ' : 'Live negotiations change in our next turn: ', ...names(live), '.']] : null,
      !open.length ? ['p', ['Nothing in our documents needs to change before then.']] : null].filter(Boolean);
  }
  if (intent === 'signed') {
    const signed = ROWS.filter(r => r.stage === 'signed');
    if (signed.length) return [
      ['p', ['No. A signed contract doesn’t change by itself. Where the law overrides it, the law applies anyway, but the old words stay in the contract until both sides agree a change. For each one, Clavia checked for a change-in-law clause and whether it renews before the law applies:']],
      ['ul', signed.map(r => [['doc', r.id], ` · ${r.done ? 'already complies' : r.next}.`])]];
  }
  if (intent === 'mail') {
    const m = mailText(u, ['Internal stakeholders', 'What we must do, and by when']);
    return [['p', ['Here is a draft. Change anything before you send it, or tell me who it is for and I’ll rewrite it.']],
      ['p', [`To: ${m.to}`]], ['p', [`Subject: ${m.subj}`]],
      ...(() => { const out = []; for (const par of m.body.split('\n\n')) { let ul = null; for (const l of par.split('\n')) {
        if (l.startsWith('• ')) { if (!ul) { ul = ['ul', []]; out.push(ul); } ul[1].push([l.slice(2)]); } else { ul = null; out.push(['p', [l]]); } } } return out; })()];
  }
  if (intent === 'next') return [['p', [d.sum[d.sum.length - 1]]],
    ['p', [u.next && daysTo(u.next) >= 0 ? `The next date is ${shortDate(u.next)}.` : 'There is no date to work to yet.', ' Nothing in our documents is touched today; Horizon checks every hour and will flag the final text.']]];
  const why = [d.why ? ['p', [d.why]] : null, ['ul', d.sum.map(t => [t])]].filter(Boolean);
  if (intent === 'why') return why;
  return [['p', [`Here is what this update means for Lumen.`]], ...why, ...(open.length ? askAnswer(u, 'first') : [])];
}
function askSend(u, q) {
  const t = (q || '').trim(); if (!t) return;
  const c = ASKS[u.id] ||= [];
  const turn = { q: t, a: null }; c.push(turn); log(u, { what: 'asked Clavia', text: t }); paint();
  setTimeout(() => { turn.a = askAnswer(u, askIntent(t)); if (state.chat === u.id) paint(); }, 1000);
}
/* The chat docks on the left of the update, as Clavia's own conversations sit beside what they
   work on, and as Legora's monitor chat does. It is built from Clavia's chat: the thread header,
   bubbles, the trace line, .prose answers and the real composer (initComposer). The composer is
   made once per update and kept, so a repaint never loses what is being typed. */
let chatUI = null;
const CHAT_W = (() => { try { return +localStorage.getItem('clavia-ri-chatw') || 0; } catch (e) { return 0; } })();
function chatCol(u) {
  if (!chatUI || chatUI.id !== u.id) {
    const scroll = h('div', { class: 'thread-scroll' }), inner = h('div', { class: 'thread-inner' }); scroll.append(inner);
    const ic = (label, d, run) => h('button', { class: 'hzc-ic', type: 'button', 'aria-label': label, title: label, onclick: run, html: svg(d) });
    const askEl = h('div', { class: 'ask ask-mini', html: '<textarea rows="1" aria-label="Ask about this update" placeholder="Ask about this update"></textarea>'
      + '<div class="askbar"><button class="send" type="button" disabled aria-label="Send"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button></div>' });
    const el = h('div', { class: 'thread hzx-chat', role: 'complementary', 'aria-label': 'Ask Clavia' },
      h('header', { class: 'thread-head' },
        h('span', { class: 'thread-title' }, h('span', { class: 'thread-title-text' }, nameOf(u))),
        ic('New chat', '<path d="M8 3v10M3 8h10"/>', () => { ASKS[u.id] = []; paint(); askEl.querySelector('textarea').focus(); }),
        ic('Continue in New Chat', '<path d="M9.5 2.5h4v4M13.5 2.5 8.5 7.5M12 9.5v3a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3"/>', () => toChat(u, askEl.querySelector('textarea').value)),
        ic('Close', '<path d="M4 4l8 8M12 4l-8 8"/>', () => { state.chat = null; paint(); })),
      scroll,
      h('div', { class: 'thread-dock' }, h('div', { class: 'askwrap' }, askEl)));
    chatUI = { id: u.id, el, scroll, inner };
    queueMicrotask(() => { if (typeof initComposer === 'function') initComposer(askEl, { noTokens: true, noModel: true, onSend: (t) => askSend(u, t) }); });
  }
  paintChat(u);
  if (CHAT_W) chatUI.el.style.width = CHAT_W + 'px';
  return chatUI.el;
}
function paintChat(u) {
  const c = ASKS[u.id] ||= [], asked = new Set(c.map(x => x.q));
  const sugs = askQuestions(u).filter(([, q]) => !asked.has(q)), busy = c.some(x => !x.a);
  const part = (x) => Array.isArray(x) && x[0] === 'doc'
    ? h('button', { class: 'ans-doc', type: 'button', onclick: () => openRow(x[1]) }, shortN(docOf(x[1]) || { name: x[1] })) : x;
  const block = ([k, v]) => k === 'ul' ? h('ul', { class: 'prose-ul' }, ...v.map(li => h('li', {}, ...li.map(part)))) : h('p', { class: 'prose-p' }, ...v.map(part));
  const n = ROWS.length, docs = `${n} ${n === 1 ? 'document' : 'documents'}`;
  /* Clavia's suggestions under an answer (.sugg): each is a message you could have typed */
  const sugList = () => h('div', { class: 'sugg' }, h('div', { class: 'sugg-h' }, 'Suggestions'),
    ...sugs.map(([, q]) => h('button', { class: 'sugg-it', type: 'button', onclick: () => askSend(u, q) },
      h('span', { class: 'sugg-ar', 'aria-hidden': 'true', html: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3v5.5a2 2 0 0 0 2 2h6.5"/><path d="M10 8l2.5 2.5L10 13"/></svg>' }), h('span', {}, q))));
  chatUI.inner.replaceChildren(...[
    h('span', { class: 'att' }, h('img', { src: QUILL, alt: '' }), `${nameOf(u)} · ${docs}`),
    ...(c.length ? [] : [h('div', { class: 'hzc-empty' }, h('img', { src: QUILL, alt: '' }), h('p', {}, `Ask anything about the ${nameOf(u)}. Clavia reads the update and the ${docs} it touches.`)), sugList()]),
    ...c.flatMap(x => [
      h('div', { class: 'msg msg-user' }, h('div', { class: 'msg-col' }, h('div', { class: 'bubble' }, x.q))),
      h('div', { class: 'msg msg-bot' },
        /* the trace, as Clavia shows where an answer came from: one caption line above it */
        h('div', { class: 'trace-host' }, h('div', { class: 'trace', 'data-open': 'false' },
          h('span', { class: 'trace-head' + (x.a ? '' : ' working') }, x.a ? `Read the update · Checked ${docs}` : `Reading the update${n ? ` and ${docs}` : ''}…`))),
        x.a ? h('div', { class: 'prose' }, ...x.a.map(block)) : null)]),
    c.length && !busy && sugs.length ? sugList() : null].filter(Boolean));
  setTimeout(() => { chatUI.scroll.scrollTop = chatUI.scroll.scrollHeight; }, 0);
}
/* the line between the chat and the update; drag to resize, double-click resets */
function splitBar() {
  const bar = h('div', { class: 'hzx-split', role: 'separator', 'aria-orientation': 'vertical', 'aria-label': 'Resize chat', tabindex: '0' });
  const set = (w) => { const max = Math.max(360, root.clientWidth - 480), v = Math.round(Math.min(max, Math.max(340, w))); chatUI.el.style.width = v + 'px'; try { localStorage.setItem('clavia-ri-chatw', v); } catch (e) {} };
  bar.addEventListener('pointerdown', (e) => {
    e.preventDefault(); bar.setPointerCapture(e.pointerId); bar.classList.add('is-drag');
    const x0 = root.getBoundingClientRect().left;
    const move = (ev) => set(ev.clientX - x0), up = () => { bar.classList.remove('is-drag'); bar.removeEventListener('pointermove', move); bar.removeEventListener('pointerup', up); };
    bar.addEventListener('pointermove', move); bar.addEventListener('pointerup', up);
  });
  bar.addEventListener('dblclick', () => { chatUI.el.style.width = ''; try { localStorage.removeItem('clavia-ri-chatw'); } catch (e) {} });
  bar.addEventListener('keydown', (e) => { const w = chatUI.el.offsetWidth; if (e.key === 'ArrowLeft') set(w - 24); if (e.key === 'ArrowRight') set(w + 24); });
  return bar;
}
/* the same question, in Clavia's own chat, with the update attached */
function toChat(u, typed) {
  const q = (typed || '').trim() || ASKS[u.id]?.[ASKS[u.id].length - 1]?.q || '';
  if (typeof mxAsk !== 'function') return toast('New Chat isn’t available here');
  mxAsk([{ kind: 'file', label: nameOf(u), mark: ASK_MARK }]);
  /* New Chat's composer wires itself a tick later; the question goes into it, ready to send */
  if (q) setTimeout(() => { const box = document.querySelector('#view .ask textarea'); if (!box) return; box.value = q; box.dispatchEvent(new Event('input', { bubbles: true })); box.focus(); }, 60);
}
const ASK_MARK = '<svg class="ic" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6.5"/><circle cx="8" cy="8" r="3.2"/><circle cx="8" cy="8" r=".6"/></svg>';

/* ── a new watch, said in plain words (Harvey's Describe scan → Create scan) ── */
const NW_EXAMPLE = 'e.g. Track how EU member states are bringing the Pay Transparency Directive into national law, for our teams in Ireland and Germany';
const nw = { text: '', improved: false, stage: 'describe', step: 0, form: null };
function improve(t) {
  return /pay/i.test(t)
    ? 'Track how EU member states transpose the Pay Transparency Directive (2023/970) into national law, focusing on new pay reporting duties, pay-range disclosure in job ads, and deadlines that affect our employing companies in Ireland and Germany.'
    : t.replace(/\s+$/, '') + (/[.]$/.test(t) ? '' : '.') + ' Focus on new obligations, deadlines and changes to what our contracts and policies must say.';
}
function formFrom(t) {
  const pay = /pay|salary|wage|employ/i.test(t);
  return pay
    ? { name: 'EU pay transparency', intent: t, juris: ['EU', 'Ireland', 'Germany', 'France'], sources: ['EUR-Lex', 'Irish Statute Book', 'Bundesgesetzblatt', 'Journal officiel'], topics: ['Pay transparency', 'Employment'] }
    : { name: t.split(/[,.]/)[0].replace(/^(track|watch|monitor)\s+/i, '').slice(0, 40) || 'New watch', intent: t, juris: ['EU', 'UK'], sources: ['EUR-Lex', 'legislation.gov.uk'], topics: ['Data protection'] };
}
function newWatchView() {
  const q = h('div', { class: 'nw-q' }, h('img', { src: QUILL, alt: '', style: 'filter:invert(1) brightness(.35)' }));
  if (nw.stage === 'scanning') {
    const f = nw.form, S = ['Reading what you want to watch', `Choosing sources: ${f.sources.slice(0, 2).join(', ')} and ${f.sources.length - 2} more`, 'Looking back over the last 90 days', 'Reading each find against Lumen’s profile'];
    return [h('div', { class: 'nw' }, q, h('h1', {}, `Setting up ${f.name}`),
      h('div', { class: 'nw-steps' }, ...S.map((t, i) => h('div', { class: i < nw.step ? 'done' : i === nw.step ? 'now' : 'wait' },
        h('i', { 'aria-hidden': 'true', html: i < nw.step ? '<svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 8.5 2.5 2.5L12 5.5"/></svg>' : '' }),
        i === nw.step ? h('span', { class: 'working' }, t + '…') : t))))];
  }
  const ta = h('textarea', { id: 'nw-text', placeholder: NW_EXAMPLE, 'aria-label': 'What should Horizon watch?', oninput: (e) => { nw.text = e.target.value; cont.disabled = !nw.text.trim(); imp.hidden = !nw.text.trim(); } });
  ta.value = nw.text;
  const imp = h('button', { class: 'sx-link', type: 'button', hidden: !nw.text.trim(), onclick: () => { nw.text = improve(nw.text); nw.improved = true; paint(); toast('Clavia sharpened the description'); }, html: svg('<path d="M3 13 11 5M10 3l.5 1.5L12 5l-1.5.5L10 7l-.5-1.5L8 5l1.5-.5ZM13 8l.3.9.9.3-.9.3-.3.9-.3-.9-.9-.3.9-.3Z"/>') + 'Improve' });
  const cont = h('button', { class: 'pb-btn primary', type: 'button', disabled: !nw.text.trim(), onclick: () => createDialog(formFrom(nw.text)) }, 'Continue');
  return [
    h('div', { class: 'hz-bar' }, h('button', { class: 'hz-back', type: 'button', 'aria-label': 'Back', onclick: () => go('horizon'), html: back() }),
      h('nav', { class: 'hz-crumbs' }, h('button', { class: 'hz-crumb', type: 'button', onclick: () => go('horizon') }, 'Horizon'), h('span', { class: 'hz-sep' }, '›'), h('span', { class: 'hz-crumb is-here' }, 'New watch'))),
    h('div', { class: 'nw' }, q, h('h1', {}, 'What should Horizon watch?'),
      h('div', { class: 'nw-info' }, 'Watches run every hour across the coverage you set. Clavia picks the sources; you can change them.'),
      h('div', { class: 'nw-box' }, ta, h('div', { class: 'nw-tools' }, imp)),
      h('div', { class: 'nw-acts' }, h('button', { class: 'pb-btn', type: 'button', onclick: () => createDialog({ name: '', intent: nw.text, juris: [], sources: [], topics: [] }) }, 'Set Up Manually'), cont))];
}
/* jurisdictions and topics are picked from a list, Clavia's filter popover: find, tick, N selected · Clear */
const JURIS_OPTS = [['Europe', [['🇪🇺', 'EU'], ['🇬🇧', 'UK'], ['🇮🇪', 'Ireland'], ['🇩🇪', 'Germany'], ['🇫🇷', 'France'], ['🇳🇱', 'Netherlands']]],
  ['Americas', [['🇺🇸', 'United States'], ['🇺🇸', 'California'], ['🇺🇸', 'Colorado'], ['🇺🇸', 'New York'], ['🇨🇦', 'Canada']]],
  ['Middle East', [['🇦🇪', 'United Arab Emirates'], ['🇸🇦', 'Saudi Arabia'], ['🇶🇦', 'Qatar']]],
  ['Asia-Pacific', [['🇮🇳', 'India'], ['🇸🇬', 'Singapore'], ['🇦🇺', 'Australia'], ['🇯🇵', 'Japan']]]];
const TOPIC_OPTS = [['Data and privacy', ['Data protection', 'International transfers', 'Cross-border transfers', 'Data localisation', 'Cookies']],
  ['Cloud and cyber', ['Cloud contracts', 'Cybersecurity', 'Incident reporting']],
  ['AI', ['AI transparency', 'Automated decisions', 'General-purpose AI models']],
  ['Commercial and people', ['Consumer protection', 'Financial services customers', 'Employment', 'Pay transparency', 'Sanctions']]];
const flagOf = (n) => JURIS_OPTS.flatMap(g => g[1]).find(x => x[1] === n)?.[0];
function pickPop(anchor, arr, groups, noun, flags, onChange) {
  document.querySelector('.mx-fpop')?.remove();
  const q = h('input', { class: 'mx-fpop-q', type: 'text', placeholder: `Find ${noun}…`, 'aria-label': `Find ${noun}`, autocomplete: 'off', oninput: () => paintP() });
  const secs = h('div', { class: 'mx-fpop-secs' }), foot = h('div', { class: 'mx-fpop-foot' });
  const pop = h('div', { class: 'mx-fpop', role: 'dialog', 'aria-label': `Choose ${noun}` }, h('div', { class: 'mx-fpop-head' }, h('span', { class: 'mx-ap-glass', html: svg('<circle cx="7" cy="7" r="4.5"/><path d="m10.5 10.5 3 3"/>') }), q), secs, foot);
  const box = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 8.3 2.6 2.6L12 5.4"/></svg>';
  const toggle = (v) => { const i = arr.indexOf(v); i < 0 ? arr.push(v) : arr.splice(i, 1); onChange(); paintP(); };
  const opt = (v, fl) => { const on = arr.includes(v);
    return h('button', { class: 'mx-fpop-opt' + (on ? ' is-on' : ''), type: 'button', role: 'menuitemcheckbox', 'aria-checked': String(on), onclick: () => toggle(v) },
      h('span', { class: 'mx-fpop-box', html: box }), fl ? h('span', { 'aria-hidden': 'true' }, fl) : null, h('span', { class: 'mx-fpop-t' }, v)); };
  const paintP = () => {
    const t = q.value.trim().toLowerCase(), known = groups.flatMap(g => g[1].map(x => flags ? x[1] : x));
    const own = arr.filter(v => !known.includes(v));
    const all = [...(own.length ? [['Added by you', own.map(v => flags ? [flagOf(v), v] : v)]] : []), ...groups];
    const parts = all.map(([g, xs]) => { const m = xs.filter(x => !t || (flags ? x[1] : x).toLowerCase().includes(t));
      return m.length ? h('div', { class: 'mx-fpop-sec' }, h('div', { class: 'mx-fpop-h' }, g), ...m.map(x => flags ? opt(x[1], x[0]) : opt(x))) : null; }).filter(Boolean);
    const typed = q.value.trim(), exact = [...known, ...own].some(v => v.toLowerCase() === t);
    if (typed && !exact) parts.push(h('div', { class: 'mx-fpop-sec' }, h('button', { class: 'mx-fpop-opt', type: 'button', onclick: () => { arr.push(typed); q.value = ''; onChange(); paintP(); q.focus(); } },
      h('span', { class: 'mx-fpop-box', style: 'box-shadow:none;color:var(--text-soft)', html: svg('<path d="M8 3v10M3 8h10"/>') }), h('span', { class: 'mx-fpop-t' }, `Add “${typed}”`))));
    secs.replaceChildren(...parts);
    foot.hidden = !arr.length;
    foot.replaceChildren(h('span', { class: 'mx-fpop-on' }, `${arr.length} selected`), h('button', { class: 'mx-fclear', type: 'button', onclick: () => { arr.splice(0); onChange(); paintP(); } }, 'Clear'));
  };
  q.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); secs.querySelector('.mx-fpop-opt')?.click(); } });
  paintP(); portal().append(pop);
  const r = anchor.getBoundingClientRect(); pop.style.width = Math.max(280, Math.min(r.width, 360)) + 'px';
  const below = innerHeight - r.bottom > Math.min(480, innerHeight * .72) + 16;
  pop.style.top = (below ? r.bottom + 6 : Math.max(12, r.top - pop.offsetHeight - 6)) + 'px';
  pop.style.left = Math.max(12, Math.min(r.left, innerWidth - pop.offsetWidth - 12)) + 'px';
  anchor.setAttribute('aria-expanded', 'true');
  const shut = (e) => { if (e.type === 'keydown' ? e.key !== 'Escape' : pop.contains(e.target) || anchor.contains(e.target)) return;
    if (e.type === 'keydown') e.stopImmediatePropagation();
    pop.remove(); anchor.setAttribute('aria-expanded', 'false'); removeEventListener('mousedown', shut, true); removeEventListener('keydown', shut, true); };
  setTimeout(() => { addEventListener('mousedown', shut, true); addEventListener('keydown', shut, true); }, 0);
  setTimeout(() => q.focus(), 0);
}
/* ── what a watch checks in Clavia: Intake requests, Templates, Playbooks and chosen Vault folders ──
   Counts are the real ones in this Clavia. An update is only ever checked against its watch's scope;
   the update says how many documents that was and what was left out. */
const VAULT_P = 'Vault › ';
const vaultsAll = () => (typeof mxData === 'function' && mxData().vaults) || [];
const SCOPE_OPTS = () => [['In Clavia', ['Intake requests', 'Templates', 'Playbooks']], ['Vault', vaultsAll().map(v => VAULT_P + v.name)]];
function scopeN(label) {
  if (label === 'Intake requests') return typeof mxIntake === 'function' ? mxIntake().length : 0;
  if (label === 'Templates') return typeof mxData === 'function' ? (mxData().templates || []).length : 0;
  if (label === 'Playbooks') return typeof PLAYBOOK_SEED !== 'undefined' ? (PLAYBOOK_SEED.length ?? Object.keys(PLAYBOOK_SEED).length) : 0;
  const v = vaultsAll().find(x => VAULT_P + x.name === label); return v ? (v.files || v.docs || []).length || v.count || 0 : 0;
}
const vaultName = (id) => VAULT_P + (vaultsAll().find(v => v.id === id)?.name || id);
const SCOPE_SEED = { 'eu-data': ['customer-dpas', 'acme-msa', 'suppliers-2026'], ai: ['customer-dpas'], 'uk-data': ['customer-dpas', 'employment'], gulf: ['customer-dpas'] };
function scopeOf(w) {
  if (!w.scope) w.scope = ['Intake requests', 'Templates', 'Playbooks', ...(SCOPE_SEED[w.id] || ['customer-dpas']).map(vaultName)];
  return w.scope;
}
/* what Clavia picks for a new watch from what was written: employment papers for people rules, customer paper otherwise */
const scopeFor = (text) => /pay|employ|worker|staff|hr\b|pension|equal/i.test(text)
  ? ['Templates', 'Playbooks', vaultName('employment')]
  : ['Intake requests', 'Templates', 'Playbooks', vaultName('customer-dpas')];
function scopeDialog(u) {
  const w = watchOf(u.watch); if (!w) return;
  const inn = scopeOf(w), out = SCOPE_OPTS().flatMap(([, o]) => o).filter(x => !inn.includes(x));
  const total = inn.reduce((n, x) => n + scopeN(x), 0), hit = allRows(u.id).length;
  const row = (x, add) => h('li', {}, h('span', {}, x), h('span', { class: 'hz-scope-r' }, h('span', { class: 'tn' }, String(scopeN(x))),
    add ? h('button', { class: 'sx-link', type: 'button', onclick: () => { closeDlg(); addScope(u, w, x); } }, 'Add') : null));
  let closeDlg = () => {};
  dialog('What Clavia checked', [
    h('p', { class: 'how-n' }, `Clavia chose these from the watch and read all ${total} documents against this update. ${hit ? `${hit} ${hit === 1 ? 'is' : 'are'} touched by it.` : 'None is touched by it.'}`),
    h('div', { class: 'cf-f' }, h('span', { class: 'l' }, 'Checked'), h('ul', { class: 'hz-scope-l' }, ...inn.map(x => row(x, false)))),
    out.length ? h('div', { class: 'cf-f' }, h('span', { class: 'l' }, 'Not checked'), h('ul', { class: 'hz-scope-l' }, ...out.map(x => row(x, true)))) : null],
    (c) => { closeDlg = c; return [h('button', { class: 'pb-btn primary', type: 'button', onclick: c }, 'Done')]; });
}
/* adding a place: Clavia reads it now against this update, and the watch keeps it for the next ones */
function addScope(u, w, x) {
  const n = scopeN(x), mark = actOf(u).length;
  w.scope = [...scopeOf(w), x];
  actOf(u).push({ who: 'Clavia', what: `checked ${n} more ${n === 1 ? 'document' : 'documents'} in ${x}: none is touched`, when: new Date().toISOString() });
  saveWork(); paint();
  toast(`Checked ${n} ${n === 1 ? 'document' : 'documents'} in ${x}. None is touched.`,
    { label: 'Undo', run: () => { w.scope = w.scope.filter(y => y !== x); actOf(u).length = mark; saveWork(); paint(); } });
}

function pickField(f, k, label, groups, flags) {
  const noun = label.toLowerCase();
  const trig = h('div', { class: 'chipbox pick-b', role: 'button', tabindex: '0', 'aria-haspopup': 'dialog', 'aria-expanded': 'false', 'aria-label': `Choose ${noun}`,
    onclick: (e) => { if (e.target.closest('.chipx button')) return; pickPop(trig, f[k], groups, noun, flags, draw); },
    onkeydown: (e) => { if ((e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') && e.target === trig) { e.preventDefault(); pickPop(trig, f[k], groups, noun, flags, draw); } } });
  const draw = () => trig.replaceChildren(...[
    ...f[k].map((c, i) => h('span', { class: 'chipx' }, flags && flagOf(c) ? h('span', { 'aria-hidden': 'true' }, flagOf(c)) : null, c,
      h('button', { type: 'button', 'aria-label': `Remove ${c}`, onclick: (e) => { e.stopPropagation(); f[k].splice(i, 1); draw(); } }, '×'))),
    f[k].length ? null : h('span', { class: 'pick-ph' }, `Choose ${noun}`),
    h('span', { class: 'pick-chev', html: svg('<path d="m4 6 4 4 4-4"/>') })].filter(Boolean));
  draw(); return h('div', { class: 'cf-f' }, h('span', { class: 'l' }, label), trig);
}

/* edit a watch's coverage in the same form it was created with */
function editCoverage(w) {
  const f = { name: w.name, intent: w.intent || '', juris: w.juris.map(j => j[1]), topics: w.topics.slice(), sources: w.sources.slice(), scope: scopeOf(w).slice(), edit: w };
  createDialog(f);
}
function createDialog(f) {
  f.scope ||= scopeFor(`${f.name} ${f.intent}`);
  const chipField = (k, label) => {
    const box = h('div', { class: 'chipbox' });
    const draw = () => box.replaceChildren(...f[k].map((c, i) => h('span', { class: 'chipx' }, c, h('button', { type: 'button', 'aria-label': `Remove ${c}`, onclick: () => { f[k].splice(i, 1); draw(); } }, '×'))),
      h('input', { class: 'in', style: 'border:0;height:26px;flex:1;min-width:90px;padding:0 4px', placeholder: 'Add', 'aria-label': `Add ${label.toLowerCase()}`, onkeydown: (e) => { if (e.key === 'Enter' && e.target.value.trim()) { e.preventDefault(); f[k].push(e.target.value.trim()); draw(); box.querySelector('input').focus(); } } }));
    draw(); return h('label', {}, h('span', { class: 'l' }, label), box);
  };
  const name = h('input', { class: 'in t', value: f.name, placeholder: 'Name the watch', 'aria-label': 'Name', oninput: (e) => { f.name = e.target.value; } });
  const intent = h('textarea', { class: 'ta', rows: '3', 'aria-label': 'What it watches for', oninput: (e) => { f.intent = e.target.value; } }); intent.value = f.intent;
  dialog(f.edit ? 'Edit coverage' : 'Create watch', [h('div', { class: 'cf' }, name,
      h('label', {}, h('span', { class: 'l' }, 'What it watches for'), intent),
      pickField(f, 'juris', 'Jurisdictions', JURIS_OPTS, true), pickField(f, 'topics', 'Topics', TOPIC_OPTS, false), chipField('sources', 'Sources'),
      f.edit ? null : h('p', { class: 'note' }, f.juris.length || f.topics.length ? 'Clavia chose these from what you wrote. Change any of them; keep at least one topic or source.' : 'Pick at least one topic, or add a source.'))],
    (c) => [h('button', { class: 'pb-btn', type: 'button', onclick: c }, 'Cancel'),
      h('button', { class: 'pb-btn primary', type: 'button', onclick: () => { if (!f.name.trim()) return name.focus(); if (!f.sources.length && !f.topics.length) return toast('Add a source or a topic'); c();
        if (f.edit) { const w = f.edit, was = { name: w.name, intent: w.intent, juris: w.juris, topics: w.topics, sources: w.sources, scope: w.scope };
          Object.assign(w, { name: f.name.trim(), intent: f.intent, juris: f.juris.map(j => [flagOf(j) || '🌐', j]), topics: f.topics, sources: f.sources, scope: f.scope }); paint();
          toast('Coverage saved. It applies from the next check.', { label: 'Undo', run: () => { Object.assign(w, was); paint(); } }); }
        else startScan(f); } }, f.edit ? 'Save' : 'Create')]);
}
function startScan(f) {
  nw.form = f; nw.stage = 'scanning'; nw.step = 0; paint();
  const tick = () => { nw.step++; paint(); if (nw.step < 4) setTimeout(tick, 900); else setTimeout(finish, 700); };
  setTimeout(tick, 900);
}
function finish() {
  const f = nw.form, wid = 'w' + Date.now().toString(36);
  WATCHES.push({ id: wid, name: f.name, owner: 'Roger Bennett', checked: 0, juris: f.juris.map(j => [flagOf(j) || '🌐', j]),
    topics: f.topics, sources: f.sources, scope: f.scope, intent: f.intent });
  const pay = /pay transparency/i.test(f.name + f.intent) && !UPDATES.some(u => u.id === 'HZ-243');
  const nextId = () => 'HZ-' + (Math.max(...UPDATES.map(u => +u.id.slice(3))) + 1);
  const found = pay ? [
    { id: 'HZ-243', st: 'open', unread: true, watch: wid, days: 3, title: 'Ireland: General Scheme of the Pay Transparency Bill published', lede: 'The Bill brings Directive 2023/970 into Irish law: pay ranges in job ads, a ban on asking about pay history, and pay-gap reporting by employer size.', prio: 'high', docs: 3, type: 'Bill', juris: 'Ireland', next: '2027-06-07', src: 'gov.ie' },
    { id: 'HZ-242', st: 'open', unread: true, watch: wid, days: 12, title: 'Germany: draft reform of the Pay Transparency Act enters cabinet review', lede: 'The cabinet approved a draft reform of the Entgelttransparenzgesetz to implement the Directive; it now goes to the Bundestag.', prio: 'low', docs: 0, type: 'Bill', juris: 'Germany', next: null, src: 'bundesregierung.de' },
    { id: 'HZ-241', st: 'open', unread: true, watch: wid, days: 40, title: 'Italy publishes its pay transparency implementing decree', lede: 'Italy became the first major economy to transpose Directive 2023/970, publishing its decree in the Gazzetta Ufficiale.', prio: 'low', docs: 0, type: 'Decree', juris: 'Italy', next: null, src: 'gazzettaufficiale.it' }]
    : [{ id: nextId(), st: 'open', unread: true, watch: wid, days: 0, title: `${f.name}: nothing that applies yet`, lede: 'Horizon looked back 90 days and found nothing that touches Lumen. It checks every hour from now on.', prio: 'low', docs: 0, type: 'Notice', juris: f.juris[0] || 'EU', next: null, src: (f.sources[0] || 'eur-lex.europa.eu').toLowerCase().replace(/\s+/g, '') }];
  UPDATES.push(...found);
  FLAG.Germany = '🇩🇪'; FLAG.Italy = '🇮🇹'; FLAG.France = '🇫🇷';
  if (pay) {
    DETAIL['HZ-243'] = { sum: ['Job ads must state the starting pay or its range.', 'Employers may not ask candidates about their pay history.', 'Employers with 150+ staff report pay gaps from June 2027; 100+ from 2031.'],
      why: 'Lumen Analytics Ireland Ltd employs people in Dublin. The employment papers in Clavia are for the UK, so nothing in them changes yet; the Irish ones will need pay ranges when they are written.' };
    DETAIL['HZ-242'] = { sum: ['The draft adds individual pay-information rights and joint pay assessments where an unjustified gap exceeds 5%.', 'Reporting phases in by employer size.'], why: 'We have no employing company in Germany today, so this doesn’t touch our documents yet.' };
    DETAIL['HZ-241'] = { sum: ['Italy’s decree sets pay-range disclosure and reporting for employers with 100+ staff.'], why: 'We have no employees in Italy.' };
  }
  DIGEST[wid] = pay ? [{ head: 'Ireland’s bill is the first to land. Our employment papers are for the UK, so nothing changes yet.', body: [['Job ads must show pay ranges and we may not ask about pay history; gap reporting starts in June 2027 for employers with 150+ staff.', 'HZ-243'], ['Germany’s reform is still in cabinet review, and we have no employing company there.', 'HZ-242']], fresh: 3, urgent: 1 }] : null;
  nw.stage = 'describe'; nw.text = ''; nw.step = 0;
  state.watch = wid; state.fresh = wid; hzState.wtab = 'all'; go('watch');
  if (pay) setTimeout(() => { state.notif = 'HZ-243'; paint(); setTimeout(() => { if (state.notif) { state.notif = null; paint(); } }, 9000); }, 1200);
}
function notifCard() {
  if (!state.notif) return null;
  const u = UPDATES.find(x => x.id === state.notif); if (!u) return null;
  return h('button', { class: 'notif', type: 'button', 'aria-label': 'Open the update from the alert', onclick: () => { state.notif = null; openUpdate(u); } },
    h('span', { class: 'ol', 'aria-hidden': 'true' }, 'O'),
    h('span', {}, h('b', {}, '1 update to review'), `Your watch “${watchOf(u.watch).name}” has a high-priority update: ${u.title}.`));
}


/* delete a watch: name what goes with it, ask, then Undo */
const DOTS = svg('<circle cx="3.5" cy="8" r="1.2"/><circle cx="8" cy="8" r="1.2"/><circle cx="12.5" cy="8" r="1.2"/>');
const TRASH = '<path d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 8.5h5.8l.6-8.5M7 7v4M9 7v4"/>';
function watchMenu(w, where) {
  return h('div', { class: 'wmenu', role: 'menu', onclick: (e) => e.stopPropagation() },
    where === 'card' ? h('button', { type: 'button', role: 'menuitem', onclick: () => { state.wmenu = null; state.watch = w.id; hzState.wtab = 'all'; go('watch'); }, html: svg('<path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8Z"/><circle cx="8" cy="8" r="2"/>') + 'View' }) : null,
    h('button', { type: 'button', role: 'menuitem', onclick: () => { state.wmenu = null; paint(); editCoverage(w); }, html: svg('<circle cx="8" cy="8" r="2"/><path d="M8 1.8v1.6M8 12.6v1.6M1.8 8h1.6M12.6 8h1.6M3.6 3.6l1.1 1.1M11.3 11.3l1.1 1.1M3.6 12.4l1.1-1.1M11.3 4.7l1.1-1.1"/>') + 'Edit Coverage' }),
    h('hr'),
    h('button', { class: 'is-danger', type: 'button', role: 'menuitem', onclick: () => { state.wmenu = null; paint(); confirmDelete(w); }, html: svg(TRASH) + 'Delete Watch' }));
}
function confirmDelete(w) {
  const mine = UPDATES.filter(u => u.watch === w.id);
  const live = mine.filter(u => u.st === 'open');
  const body = [h('p', { class: 'how-n' }, `Horizon stops checking ${w.sources.length} ${w.sources.length === 1 ? 'source' : 'sources'} for this watch. ` +
      (mine.length ? `Its ${mine.length} ${mine.length === 1 ? 'update goes' : 'updates go'} with it.` : 'It has no updates yet.'))];
  if (live.length) body.push(h('ul', { class: 'del-list' }, ...live.map(u => h('li', {}, h('span', {}, u.title), h('span', { class: 's' }, u.unread ? 'New' : 'Open')))));
  if (live.some(u => !u.unread)) body.push(h('p', { class: 'note' }, 'Work already started on these stays where it is: documents, requests and playbook changes are not undone.'));
  dialog(`Delete “${w.name}”?`, body, (c) => [h('button', { class: 'pb-btn', type: 'button', onclick: c }, 'Cancel'),
    h('button', { class: 'pb-btn danger', type: 'button', onclick: () => { c(); deleteWatch(w); } }, 'Delete Watch')]);
}
function deleteWatch(w) {
  const wi = WATCHES.indexOf(w), gone = UPDATES.filter(u => u.watch === w.id);
  WATCHES.splice(wi, 1);
  for (const u of gone) UPDATES.splice(UPDATES.indexOf(u), 1);
  if (state.watch === w.id) state.watch = WATCHES[0]?.id;
  go('horizon');
  toast(`${w.name} deleted`, { label: 'Undo', run: () => { WATCHES.splice(wi, 0, w); UPDATES.push(...gone); paint(); } });
}

/* popovers and menus, Clavia style */
let popEl = null;
function closePop() { popEl?.remove(); popEl = null; removeEventListener('mousedown', popOut, true); }
function popOut(e) { if (popEl && !popEl.contains(e.target)) closePop(); }
function popAt(anchor, el, align = 'right') {
  closePop(); popEl = el; portal().append(el);
  const r = anchor.getBoundingClientRect();
  el.style.top = Math.max(12, r.bottom + 8 + el.offsetHeight > innerHeight - 12 ? r.top - el.offsetHeight - 8 : r.bottom + 8) + 'px';
  el.style.left = Math.max(12, Math.min(align === 'right' ? r.right - el.offsetWidth : r.left, innerWidth - el.offsetWidth - 12)) + 'px';
  setTimeout(() => addEventListener('mousedown', popOut, true), 0);
  setTimeout(() => el.querySelector('button')?.focus(), 0);
}
/* Clavia's menu (app.js menu()): icon, label, a tick at the end of the chosen row, rules between groups */
function menuAt(anchor, items) {
  if (typeof menu === 'function') { if (typeof mxGlyphs === 'function') mxGlyphs();
    /* a flag for priority, drawn as the menu's own line icons are (a brand mark would come out in colour) */
    if (typeof GLYPHS !== 'undefined') GLYPHS.hzflag ||= '<path d="M6 20.5v-16"/><path d="M6 4.5h11.5l-2.6 4.2 2.6 4.3H6"/>';
    return menu(anchor, items); }
  popAt(anchor, h('div', { class: 'fw-menu', role: 'menu' }, ...items.filter(it => it && !it.rule).map(it => h('button', { type: 'button', role: 'menuitem', onclick: () => { closePop(); it.run(); } },
    h('span', {}, it.label), it.tick ? h('span', { class: 'tick', 'aria-label': 'selected' }, '✓') : null))), 'right');
}
addEventListener('keydown', (e) => { if (e.key === 'Escape' && popEl) { e.stopImmediatePropagation(); closePop(); } }, true);

document.addEventListener('click', () => { if (!root.isConnected) return; if (state.pop || state.menu || state.wmenu) { state.pop = false; state.menu = false; state.wmenu = null; paint(); } });
document.addEventListener('keydown', (e) => { if (!root.isConnected) return; if (e.key === 'Escape' && !document.querySelector('.pb-dim')) { if (state.pop) { state.pop = false; paint(); } else if (state.menu || state.wmenu) { state.menu = false; state.wmenu = null; paint(); } else if (state.open) { state.open = null; paint(); } } });
UPDATES.forEach(u => { if (u.st === 'open') seedUpdate(u); });
try { const W = JSON.parse(localStorage.getItem('clavia-ri-work') || 'null'); for (const [id, v] of Object.entries(W?.ups || {})) { const u = UPDATES.find(x => x.id === id);
  if (u && v && !Array.isArray(v) && ['open', 'done', 'archived'].includes(v.st)) Object.assign(u, { st: v.st, why: v.why, archBy: v.archBy, preArch: v.preArch, unread: !!v.unread }); } } catch (e) {}
try { const M = JSON.parse(localStorage.getItem('clavia-ri-mine') || 'null'); if (M) {
  for (const [id, p] of Object.entries(M.prio || {})) { const r = Object.values(IMPACT).flatMap(I => I.rows).find(x => x.id === id); if (r && PRIO[p] && r.prio !== p) { r.clavia = r.prio; r.prio = p; } }
  for (const [uid, I] of Object.entries(IMPACT)) { const U = UPDATES.find(x => x.id === uid); if (U && I.rows.some(r => r.clavia)) { const o = I.rows; U.prio = o.some(r => r.prio === 'urgent' && !r.done) ? 'urgent' : o.some(r => r.prio === 'high' && !r.done) ? 'high' : 'low'; } } } } catch (e) {}

/* ── in Clavia: Horizon's address is #horizon/<path>, held in MX.horizon.open ──
   (none) the watches · watch/<id> a watch · new a new watch · HZ-231 an update · HZ-231/doc/<id> one of its documents */
function pathOf() {
  const v = state.view;
  if (v === 'horizon') return null;
  if (v === 'watch') return 'watch/' + state.watch;
  if (v === 'new') return 'new';
  if (v === 'doc') return `${state.impact}/doc/${state.docId}`;
  return state.impact;
}
function syncAddress() {
  if (typeof MX === 'undefined' || !MX.horizon) return;
  const p = pathOf(); MX.horizon.open = p;
  const want = p ? 'horizon/' + encodeURIComponent(p).replace(/%2F/g, '/') : 'horizon';
  if (root.isConnected && location.hash.slice(1) !== want) location.hash = want;
}
function fromAddress(p) {
  state.open = null; state.pop = false; state.menu = false; state.wmenu = null;
  if (!p) { state.view = 'horizon'; return; }
  const [a, b, c] = p.split('/');
  if (a === 'watch' && watchOf(b)) { state.watch = b; state.view = 'watch'; return; }
  if (a === 'new') { state.view = 'new'; return; }
  const u = UPDATES.find(x => x.id === a);
  if (u) {
    useImpact(a);
    if (b === 'doc' && allRows().some(x => x.id === c)) { if (state.docId !== c) state.dtabDoc = 'overview'; state.docId = c; state.view = 'doc'; return; } state.view = 'impact'; return;
  }
  state.view = 'horizon';
}
function scrollTop() { document.getElementById('view')?.scrollTo?.(0, 0); document.getElementById('main')?.scrollTo?.(0, 0); }
window.hzxView = function hzxView() {
  fromAddress(typeof MX !== 'undefined' && MX.horizon ? MX.horizon.open : null);
  paint();
  /* what is showing may differ from what was asked (an unknown watch or update); the address
     follows quietly, without another hashchange */
  if (typeof MX !== 'undefined' && MX.horizon) {
    const p = MX.horizon.open = pathOf(), want = p ? 'horizon/' + encodeURIComponent(p).replace(/%2F/g, '/') : 'horizon';
    if (/^#?horizon\b/.test(location.hash.slice(1)) && location.hash.slice(1) !== want) history.replaceState(null, '', '#' + want);
  }
  return root;
};


})();
