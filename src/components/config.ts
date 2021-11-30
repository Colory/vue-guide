import { InjectionKey, Ref, ref } from "vue";
import { App, DirectiveBinding, reactive, inject, computed } from "vue";

export interface Intro {
  // id
  id: string;

  // information for user.
  content: string;

  // get pos from the method.
  // el information may be too large for pages. only function is used here.
  positionProvider: () => {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

// 插件
export const plugin = {
  install(app: App) {
    // 定义全局流程
    const intro = reactive<{ list: Intro[] }>({
      list: [],
    });

    app.directive("intro", {
      mounted: (
        el: HTMLElement,
        { value: content, arg: id }: DirectiveBinding<string>
      ) => {
        // 必要参数缺失或者重复
        if (!id || intro.list.some((i) => i.id === id)) return;
        // 绑定相关属性
        intro.list.push({
          id,
          // get position from the rect.
          positionProvider: () => el.getBoundingClientRect(),
          content,
        });
      },
      unmounted: (el: HTMLElement, { arg: id }: DirectiveBinding<string>) => {
        intro.list = intro.list.filter((i) => i.id === id);
      },
    });

    // provide it for whole project
    app.provide(
      INTRO_KEY,
      computed(() => intro.list)
    );

    // index start from -1;
    app.provide(INTRO_IND_KEY, ref(-1));
  },
};

/**
 * list information.
 */
export const INTRO_KEY: InjectionKey<Ref<Intro[]>> = Symbol();
/**
 * the index of the intro list.
 */
export const INTRO_IND_KEY: InjectionKey<Ref<number>> = Symbol();

export const useIntro = () => {
  const introList = inject(INTRO_KEY);
  const index = inject(INTRO_IND_KEY);
  if (!introList || !index)
    throw new Error(
      "need provide the intro list before use!!! is it ok for IntroConfig component?"
    );
  // next intro
  const forward = () => (index.value += 1);
  const back = () => (index.value -= 1);

  const cancel = () => (index.value = -1);
  const start = () => (index.value = 0);

  return {
    forward,
    back,
    cancel,
    start,
    // current intro.
    current: computed(() => introList.value[index.value]),
  };
};
