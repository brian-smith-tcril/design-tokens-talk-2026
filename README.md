# Design Tokens: Plugin Slots but for your CSS

Slides and example artifacts for the talk *Design Tokens: Plugin Slots but for your CSS*.

Presented by Brian Smith (Axim Collaborative), Kshitij Sobti (OpenCraft), and Kaustav Banerjee (OpenCraft) at [Open edX Conference 2026](https://openedx.org/blog/join-us-for-the-open-edx-conference-2026/).

- 📑 Slides: [`slides/slides.pdf`](./slides/slides.pdf)
- 🎥 Recording: *coming after the conference posts the video*

## Topics covered

### 1. Design tokens (concept)

> Design tokens are indivisible pieces of a design system such as colors, spacing, typography scale.

— [Design Tokens W3C Community Group, abstract](https://www.designtokens.org/tr/2025.10/#abstract)

[Paragon](https://github.com/openedx/paragon) uses [Style Dictionary](https://styledictionary.com) to transform [DTCG](https://www.designtokens.org/) tokens into CSS variables consumed by Open edX frontend components and applications.

### 2. Plugin slots (Frontend Plugin Framework)

Frontend application content in [FPF](https://github.com/openedx/frontend-plugin-framework) plugin slots can be replaced or modified at build time.

**Examples from the talk:**

- [`plugin-catalog-slot-highlighter/`](./plugin-catalog-slot-highlighter/) — wraps each catalog home page slot's default contents in a thick dashed colored border
- [`plugin-learner-dashboard-sidebar-highlighter/`](./plugin-learner-dashboard-sidebar-highlighter/) — wraps the learner dashboard's widget sidebar slot in a thick dashed red border
- [`plugin-knobby/`](./plugin-knobby/) — see [Application tokens (in plugins)](#3c-application-tokens-in-plugins)
- [`frontend-component-footer/.../FooterSlot`](https://github.com/openedx/frontend-component-footer/tree/master/src/plugin-slots/FooterSlot) — upstream README documenting the custom footer (🦶) example

### 3. Design tokens (in the Open edX platform)

Design tokens are used to style Open edX frontend applications via CSS variables at runtime. Brand packages can override these tokens to define a custom visual identity.

#### 3a. Paragon tokens

Design tokens defined in [Paragon](https://github.com/openedx/paragon). Overriding one of these tokens changes the appearance everywhere it's used, such as in Paragon component and/or application stylesheets.

**Examples from the talk:**

- [`brand-example-purple/`](./brand-example-purple/) — `openedx/sample-plugin`'s `brand-sample` applied to `frontend-app-authn`

#### 3b. Application tokens (in frontend applications)

Design tokens defined in and specific to a frontend application.

**Examples from the talk:**

- [`brand-catalog-background/`](./brand-catalog-background/) — a brand package that overrides `frontend-app-catalog`'s `--catalog-home-page-banner-background-color` to `#b16b2c`

#### 3c. Application tokens (in plugins)

Design tokens defined in and specific to a frontend plugin.

**Examples from the talk:**

- [`plugin-knobby/`](./plugin-knobby/) — a plugin that defines two volume-knob tokens (`--knobby-plugin-volume-i-knob`, `--knobby-plugin-volume-ii-knob`)
- [`brand-up-to-eleven/`](./brand-up-to-eleven/) — a brand package that overrides both Knobby tokens to `11`

### 4. Adding extension points

When developing a brand package or frontend plugin, the change you want might not yet be possible. This could be for one or more of the following reasons:

#### 4a. Hardcoded values

You might find hardcoded values in Paragon or application stylesheets where existing Paragon tokens clearly belong.

**Examples:**

- [openedx/paragon#2568](https://github.com/openedx/paragon/pull/2568) — replaced a hardcoded `1rem` with `var(--pgn-spacing-spacer-base)`

#### 4b. Custom components not using tokens

You might find a custom component in an application that doesn't reference design tokens. Where possible, replace the custom component with a Paragon equivalent. If the component must stay custom, application tokens can be added to expose its styling to brand packages.

**Examples:**

- [openedx/frontend-app-authn#69](https://github.com/openedx/frontend-app-authn/pull/69) — replaced a custom `Alert` component with Paragon's
- [openedx/frontend-app-authoring#2837](https://github.com/openedx/frontend-app-authoring/pull/2837) — exposed custom content library component colors as `--content-library-*` tokens

#### 4c. Components not in slots

You might find a component you want to customize that isn't in a plugin slot.

**Examples:**

- [openedx/frontend-app-learning#1771](https://github.com/openedx/frontend-app-learning/pull/1771) — wrapped the `ErrorPage` component in a new `ContentIFrameErrorSlot`

### 5. Best practices for adding extension points

Best practices for when to add new plugin slots and application tokens are an active discussion in the community. See [Frontend extensibility discussion: documenting best practices](https://discuss.openedx.org/t/frontend-extensibility-discussion-documenting-best-practices/19055) on discuss.openedx.org for the current state of the conversation.

### 6. Extensible forks

If the customization you want isn't possible with existing extension points, you might end up forking. Instead of hardcoding changes into your fork, add an extension point. By building customizations as brand packages or plugins on your fork's extension points, your customizations stay yours and the extension points themselves might land upstream.

Work in the open:

- Open a PR upstream for any extension points you add
- Start a thread on [discuss.openedx.org](https://discuss.openedx.org/) to discuss your customization goals
- Reach out on the [Open edX Slack](https://openedx.org/community/connect/)
