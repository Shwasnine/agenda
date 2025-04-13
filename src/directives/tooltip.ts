import type { DirectiveBinding, VNode, Directive } from 'vue';
import { Tooltip } from 'bootstrap';

interface TooltipOptions {
    title: string;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    trigger?: 'hover' | 'focus' | 'click' | 'hover focus' | 'click hover';
    customClass?: string;
    delay?: number | object;
    html?: boolean;
    sanitize?: boolean;
}

const validaTooltip = (el: HTMLElement) => {
    if (!el) {
        throw new Error('Element value is not defined');
    }
};

const tooltip: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding<TooltipOptions>) {
        validaTooltip(el);

        const instance = new Tooltip(el, binding.value as Tooltip.Options);

        (el as any).__tooltipInstance = instance;
    },
    updated(el: HTMLElement, binding: DirectiveBinding<TooltipOptions>) {
        validaTooltip(el);

        if (binding.value !== binding.oldValue) {
            const instance =
                (el as any).__tooltipInstance || Tooltip.getInstance(el);

            if (instance) {
                instance.dispose();
            }

            const newOptions = { ...binding.value } as Tooltip.Options;
            const newInstance = new Tooltip(el, newOptions);
            (el as any).__tooltipInstance = newInstance;
        }
    },
    unmounted(el: HTMLElement) {
        if (!el) return;

        const instance =
            (el as any).__tooltipInstance || Tooltip.getInstance(el);
        if (instance) {
            instance.dispose();
            delete (el as any).__tooltipInstance;
        }
    },
};

export default tooltip;
export { tooltip };
export type { TooltipOptions };
export type { Tooltip };
export type { DirectiveBinding };
export type { VNode };
export type { Directive };
