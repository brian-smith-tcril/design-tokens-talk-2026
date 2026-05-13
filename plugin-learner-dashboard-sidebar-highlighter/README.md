# plugin-learner-dashboard-sidebar-highlighter

A debug plugin that wraps the [`frontend-app-learner-dashboard`](https://github.com/openedx/frontend-app-learner-dashboard) widget sidebar slot's default contents in a thick dashed red border — useful as a visual reference for where the slot lives.

![Learner dashboard with the sidebar slot outlined](../images/learner-dashboard-sidebar-highlighter.png)

Paste into `frontend-app-learner-dashboard`'s `env.config.jsx`:

```jsx
import { PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.learner_dashboard.widget_sidebar.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Wrap,
          widgetId: 'default_contents',
          wrapper: ({ component }) => <div style={{
            border: 'thick dashed red',
            height: 'stretch',
            'margin-top': 0,
            'padding-top': 'calc(var(--pgn-spacing-spacer-5-5) - 5px)',
            'margin-left': '-5px'
          }}>{component}</div>,
        },
      ]
    },
  }
}

export default config;
```

## About the wrapper's extra styles

A plain `<div style={{ border: 'thick dashed red' }}>` would shift the wrapped widget's visual position — the `thick` border adds ~5px of space on each side, and the wrapper claims the widget's original outer margin. The remaining styles compensate so the widget sits exactly where it sat before being wrapped:

- `height: stretch` — fill the slot's available vertical space so the border outlines the full slot, not just the widget's intrinsic content height.
- `margin-top: 0` + `padding-top: calc(var(--pgn-spacing-spacer-5-5) - 5px)` — keep the widget at the same Y position. The wrapper claims the widget's original top spacing as its own `padding-top`, then subtracts 5px to account for the top border.
- `margin-left: -5px` — shift the wrapper 5px to the left so the left border doesn't push the widget content right.
