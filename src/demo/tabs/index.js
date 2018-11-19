import PropTypes from 'prop-types';
import React from 'react'
import './index.scss'

export default class Tabs extends React.Component {
    //设置默认props
    static defaultProps = {
        titles: ['11', '22', '33'],
        contents: ['123456', '234567', '345678'],
        initialPage: 0,
        functions: (i) => {
            console.log(i)
        },
        isAllowSlide: true,
    };

    constructor(props) {
        super(props);
        this.state = {};
        this.index = 0;
        this.initPageX = '';
        this.initPageY = '';
        this.touchEvent = null;
    }

    componentDidMount() {
        let lists = document.getElementsByClassName('tabs-ul-li');//我们的监听的元素
        lists[this.props.initialPage].classList.add('active');
        let contents = document.getElementsByClassName('tabs-content');
        contents[this.props.initialPage].classList.remove('hide');
        let tabIndex = lists.length;
        for (let i = 0; i < tabIndex; i++) {
            lists[i].addEventListener("click", (e) => {
                for (let j = 0; j < tabIndex; j++) {
                    e.target.parentNode.children[j].classList.remove("active");
                    contents[i].parentNode.children[j].classList.add("hide");
                }
                lists[i].classList.add("active");
                contents[i].classList.remove("hide");
                this.props.functions(i);
                this.index = i;
            });
            if (this.props.isAllowSlide) {
                contents[i].addEventListener("touchstart", (e) => {
                    console.log(e);
                    this.initPageX = e.targetTouches[0].pageX;
                    this.initPageY = e.targetTouches[0].pageY;
                });

                contents[i].addEventListener("touchmove", (e) => {
                    let disX = e.targetTouches[0].pageX - this.initPageX;
                    let disY = e.targetTouches[0].pageY - this.initPageY;
                    if (!this.touchEvent) {
                        // Math.abs(disX)
                        if ((disY !== 0 && Math.abs(disX) / Math.abs(disY) > Math.sqrt(3)) || disY === 0) {
                            this.touchEvent = 'switch';
                        } else {
                            this.touchEvent = 'scroll'
                        }
                    }
                    if (this.touchEvent === 'switch') {
                        e.preventDefault();
                    }
                }, {
                    passive: false//  禁止 passive 效果
                });
                contents[i].addEventListener("touchend", (e) => {
                    let switchDirection = '';
                    //在手指离开手机后touches和targetTouches中对应的元素会同时移除
                    if (e.changedTouches[0].pageX - this.initPageX > 0 && i !== 0) {
                        switchDirection = 'left'
                    } else if (e.changedTouches[0].pageX - this.initPageX < 0 && i !== tabIndex - 1) {
                        switchDirection = 'right'
                    }
                    // console.log(console.log(e.changedTouches[0].pageX - this.initPageX));
                    if (this.touchEvent === 'switch') {
                        if (switchDirection === 'left') {
                            for (let j = 0; j < tabIndex; j++) {
                                lists[j].classList.remove("active");
                                contents[j].classList.add("hide");
                            }
                            lists[i - 1].classList.add("active");
                            contents[i - 1].classList.remove("hide");
                            this.props.functions(i);
                        } else if (switchDirection === 'right') {
                            for (let j = 0; j < tabIndex; j++) {
                                lists[j].classList.remove("active");
                                contents[j].classList.add("hide");
                            }
                            lists[i + 1].classList.add("active");
                            contents[i + 1].classList.remove("hide");
                            this.props.functions(i);
                        }
                    }
                    this.touchEvent = null
                })
            }
        }
    }

    render() {
        return (
            <div className='component-tabs'>
                <ul className="tabs-ul" role="tablist">
                    {this.props.titles.map((value, index) =>
                        <li key={index} className='tabs-ul-li' style={this.props.titleStyle}>
                            {value}
                        </li>
                    )}
                </ul>
                <div className='tabs-contents'>
                    {this.props.contents.map((value, index) =>
                        <div key={index} className='tabs-content hide'>
                            {value}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
/**
 * 组件属性校正
 * @type {Object}
 */
Tabs.propTypes = {
    /**
     * titles:tabs标签名称
     * titleStyle:用来设置名称的样式
     * contents：tabs内容
     * initialPage: 初始tab所在位置（默认选项卡第一个）
     * functions：tabs点击各标签的方法
     * isAllowSlide : 控制tab是否允许通过滑动来切换
     */
    titles: PropTypes.array,
    titleStyle: PropTypes.object,
    contents: PropTypes.array,
    functions: PropTypes.func,
    initialPage: PropTypes.number,
    isAllowSlide: PropTypes.bool,
};