import './index.css'
import React from 'react'

export default class extends React.Component {
    constructor(props){
        super(props);
        this.state={
        };
    }

    componentDidMount() {
        let tit = document.getElementById("nav");
        let rect = tit.getBoundingClientRect();//获得页面中导航条相对于浏览器视窗的位置
        let inser = document.createElement("div");
        tit.parentNode.replaceChild(inser,tit);
        inser.appendChild(tit);
        inser.style.height = rect.height + "px";
        //获取距离页面顶端的距离
        let titleTop = tit.offsetTop;
        //滚动事件
        document.onscroll = function(){
                //获取当前滚动的距离
                let btop = document.body.scrollTop||document.documentElement.scrollTop;
                //如果滚动距离大于导航条据顶部的距离
                if(titleTop-btop<60){
                        //为导航条设置fix
                        tit.className = "fix";
                     }else if (titleTop-btop>60) {
                        //移除fixed
                        tit.className = "";
                     }
             }
    }

    render(){
        return (
            <div className="wrap">
                <div style={{position:'fixed',top:0 ,height:'60px',background:'blue',width:"100vw"}}>在线书城</div>
                <p>有没有一本书让你仿佛遇到春风十里</p>
                <p>好书有好事有好诗</p>
                <p>好书有好事有好诗</p>
                <p>好书有好事有好诗</p>
                <p>好书有好事有好诗</p>
                <p>好书有好事有好诗</p>
                <p>好书有好事有好诗</p>
                <p>好书有好事有好诗</p>
                    <ul id="nav">
                        <li>加入购物车</li>
                        <li>加入收藏</li>
                        <li>立即购买</li>
                    </ul>
                <p>好书有好事有好诗</p>
                <p>好书有好事有好诗</p>
                <p>好书有好事有好诗</p>
                <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>     <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>     <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>     <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>     <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>
                <p>好书有好事有好诗</p>
                <p>好书有好事有好诗</p>
                <p>好书有好事有好诗</p>
                <p>好书有好事有好诗</p>
                <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>
                    <p>好书有好事有好诗</p>
            <p>好书有好事有好诗</p>
                <p>好书有好事有好诗</p>
                <p>好书有好事有好诗</p>
                <p>好书有好事有好诗</p>
                <p>好书有好事有好诗</p>
                <p>好书有好事有好诗</p>
                </div>
        )
    }
}