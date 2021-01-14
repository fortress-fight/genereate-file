/*
 * @Description: gsap 自定义 ease
 * @Author: Fu Fei
 * @Date: 2020-08-17 12:00:38
 * @LastEditTime: 2020-12-28 12:17:59
 * @LastEditors: Fu Fei
 * @FilePath: \uemo-project\src\lib\custom_ease.ts
 */

import { gsap } from "gsap";
import { CustomEase } from "@/lib/gsap-member/esm/CustomEase.js";

gsap.registerPlugin(CustomEase);

CustomEase.create("better-elastic", "0.77, 0, 0.175, 1");
CustomEase.create("dragger-elastic", "0.18, 0.89, 0.32, 1.28");
CustomEase.create("easeOutQuart", "0.25, 1, 0.5, 1");
CustomEase.create("easeOutQuart2", ".67,.0,.47,1");
CustomEase.create("easeOutQuart3", "0.91, 0.05, 0.29, 0.99");
CustomEase.create("ease-in", ".36,.01,.57,.99");
