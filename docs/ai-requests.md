# Запросы к AI-агентам

Ниже — примеры запросов, которые использовались в разработке. Ответы AI применялись как черновые решения и затем проверялись/дорабатывались вручную.

## 1. Production-ревью компонента `Input`

> Модель: **GPT-5.3-Codex**

```md
Review the `shared/ui/input` component for production readiness.

- Focus on accessibility, API consistency, validation UX, and composability.
- For each issue, provide a minimal fix and explain why it improves long-term maintainability.
- Keep recommendations actionable and scoped to this component.
```

## 2. Создать переиспользуемый `Dialog` на базе Radix

> Модель: **GPT-5.3-Codex**

```md
Create a reusable `shared/ui/dialog` component using Radix Dialog primitives.

- Keep the API limited to `open`, `onOpenChange`, `title`, `children`, `footer`, and `className`.
- Follow existing project UI patterns for spacing, typography, and states.
- Add a short usage example for a destructive confirmation modal.
```

## 3. Спроектировать архитектуру toast с изоляцией состояния

> Модель: **GPT-5.3-Codex**

```md
Propose a toast architecture for this React application.

- Use Radix Toast for rendering and a compact Zustand store for state.
- Provide helper methods: `info(message)`, `success(message)`, and `error(message)`.
- Include rules for duplicate prevention and define the provider placement in the app tree.
```

## 4. Реализовать `NumberSlider` с делениями и контролируемым режимом

> Модель: **GPT-5.3-Codex**

```md
Implement `NumberSlider` on top of Radix Slider with production-safe defaults.

- Support both controlled and uncontrolled modes.
- Add `tickStep` to render visual ticks across the track.
- Document and handle edge cases for `min`, `max`, and `step` combinations.
```
