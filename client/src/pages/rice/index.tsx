import { useState, useEffect, useRef } from "react";
import soul from "./soul"
import star from "./star";
import Loading from "./loading"
import "./styles.css";
import { useRequest } from 'ahooks'
import Taro from "@tarojs/taro";

interface Weather {
    basic: {
        parent_city: string;
    };
    now: {
        fl: string;
        cond_txt: string;
    };
    update: {
        loc: Date;
    };
}

function getUsername(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Mock.mock('@name')
            // console.log(Mock.mock('@name'))
            resolve('aaa');
        }, 1000);
    });
}

export default function App() {
    const [address, setAddress] = useState("");
    const [time, setTime] = useState<Date>();
    const articleEl = useRef<HTMLDivElement>(null);
    const sectionEl = useRef<HTMLDivElement>(null);

    const { loading, error } = useRequest("https://free-api.heweather.net/s6/weather/now?location=auto_ip&key=cc33b9a52d6e48de852477798980b76e", {
        ready: !address,
        refreshDeps: [address],
        requestMethod: (param: any) => {
            console.log(param)
            return Taro.request({
                url: param
            })
        },
        formatResult: ({ data }) => {
            const { basic, now, update }: Weather = data.HeWeather6[0] || {};
            setAddress(
                basic.parent_city + "·" + now.cond_txt + "·" + now.fl + "℃"
            );
            setTime(update.loc);
        }
    })

    useEffect(() => {
        randomSoul();
    });

    const randomNumBoth = (min: number, max: number) => {
        const range = max - min;
        const rand = Math.random();
        const num = min + Math.round(rand * range);
        return num;
    };

    const randomSoul = () => {
        let articleDom = articleEl.current;
        let sectionEom = sectionEl.current;
        if (!articleDom || !sectionEom) {
            return;
        }
        articleDom.innerHTML = soul[
            Math.floor(Math.random() * soul.length)
        ].replace(/\*\*(.*?)\*\*/g, "<mark>$1</mark>");

        sectionEom.className = "border-" + randomNumBoth(1, 6);
    };

    if (error) {
        return <div>failed to load</div>;
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="App">
            <header>
                <img
                    src="https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png"
                    alt="log"
                />
                <h1>饭多多</h1>
                <p>我们愉快一起恰饭啊</p>
            </header>
            <section ref={sectionEl} className="border-1">
                <article ref={articleEl} />
                <address>
                    <time>{time}</time>
                    <span>{address}</span>
                </address>
            </section>
            <footer>
                <button title="点击刷新，再来一篇" onClick={randomSoul} />
            </footer>
        </div>
    );
}
