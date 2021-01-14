/*
 * @Description:公共的工具方法文件
 * @Author: Fu Fei
 * @Date: 2020-12-22 11:36:56
 * @LastEditTime: 2020-12-24 13:29:25
 * @LastEditors: Fu Fei
 * @FilePath: \emit\src\script\tools.ts
 */

interface TYPE_EVENT_CALLBACK {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any[]): void;
}
interface TYPE_EVENT {
    name: string;
    desc: string;
    detail: Map<string, TYPE_EVENT_CALLBACK[]>;
}

export class SiteManage {
    name = "";
    defaultTask: string[] = [];

    events: Map<string, TYPE_EVENT> = new Map();
    constructor(name: string) {
        this.name = name;
    }

    init(): void {
        this.defaultTask.forEach((taskName) => {
            this[taskName]();
        });
        return;
    }

    bind(name: string, callback: TYPE_EVENT_CALLBACK): void {
        const eventDetail = name.split(".");
        const eventName = eventDetail[0];

        if (this.events.has(eventName)) {
            const originEmit = this.events.get(eventName);
            if (originEmit.detail.get(name)) {
                originEmit.detail.get(name).push(callback);
            } else {
                originEmit.detail.set(name, [callback]);
            }
        } else {
            const newEvent: TYPE_EVENT = {
                name: eventName,
                desc: "",
                detail: new Map().set(name, [callback]),
            };
            this.events.set(eventName, newEvent);
        }
    }
    off(name: string, callback?: TYPE_EVENT_CALLBACK): void {
        const eventDetail = name.split(".");
        const eventName = eventDetail[0];

        if (this.events.has(eventName)) {
            const originEmit = this.events.get(eventName);
            if (callback) {
                const originCallbacks = originEmit.detail.get(eventName);
                originCallbacks.forEach((fn, i) => {
                    if (fn == callback) {
                        originCallbacks[i] = undefined;
                    }
                });
            } else if (eventName == name) {
                originEmit.detail.clear();
            } else {
                originEmit.detail.delete(eventName);
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    trigger(name: string, data: any[]): void {
        const eventDetail = name.split(".");
        const eventName = eventDetail[0];

        if (name == eventName) {
            this.events.get(eventName).detail.forEach((taskGroup) => {
                taskGroup.forEach((fn) => {
                    fn.apply(this || window, data as []);
                });
            });
        } else {
            this.events
                .get(eventName)
                .detail.get(name)
                .forEach((fn) => {
                    fn.apply(this || window, data as []);
                });
        }
    }
}

export const getScrollDir = (() => {
    const originScrollPos = { top: undefined, left: undefined };
    /**
     * 获取页面滚动方向
     *
     * @return {x, y} x: 1: 向左滚动 -1: 向右侧滚动
     *                y: 1: 向下滚动 -1: 向上滚动
     */
    return function getScrollDir(): { x: 0 | -1 | 1; y: 0 | -1 | 1 } {
        if (originScrollPos.top == undefined) {
            originScrollPos.top = window.pageYOffset;
        }
        if (originScrollPos.left == undefined) {
            originScrollPos.left = window.pageXOffset;
        }

        const diffX = window.pageXOffset - originScrollPos.left;
        const diffY = window.pageYOffset - originScrollPos.top;

        originScrollPos.top = window.pageYOffset;
        originScrollPos.left = window.pageXOffset;

        return {
            x: diffX == 0 ? 0 : diffX > 0 ? 1 : -1,
            y: diffY == 0 ? 0 : diffY > 0 ? 1 : -1,
        };
    };
})();
