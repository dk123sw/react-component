import {ImagePicker, Modal} from 'antd-mobile';
import React, {Component} from 'react'

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowNum: 1,
            isLastPosition: false,//如果是已上传到最后一张再删除会因为input没赋id导致无法上传七牛
            modal: false
        };
    }

    componentDidUpdate() {
        let imgBox = document.getElementsByClassName(this.props.name);
        let num = imgBox[0].getElementsByClassName('am-image-picker-list')[0].childNodes.length;
        if (this.state.rowNum !== num) {
            this.setState({rowNum: num});
            // this.onLoadImg();
        }
        else if (this.state.isLastPosition || this.state.modal) {
            // this.onLoadImg();
        }
    }

    /**
     * baseURL请填写自己的url
     */
    // onLoadImg = () => {
    //     let _this = this;
    //     let imgBox = document.getElementsByClassName(this.props.name);
    //     console.log(imgBox[0]);
    //     if (imgBox[0].getElementsByTagName("input")[0] !== undefined) {
    //         imgBox[0].getElementsByTagName("input")[0].setAttribute('id', `${_this.props.inputID}${_this.props.files.length / 4}`);
    //         var Qiniu1 = new QiniuJsSDK();
    //         var Qiniu2 = new QiniuJsSDK();
    //         var commonOption = {
    //             runtimes: 'html5,flash,html4',      // 上传模式,依次退化
    //             uptoken_url: 'http://171.168.1.200/quantacircle/' + 'free/getQiNiuToken',    // Ajax 请求 uptoken 的 Url，**强烈建议设置**（服务端提供）
    //             get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的 uptoken
    //             unique_names: true,              // 默认 false，key 为文件名。若开启该选项，JS-SDK 会为每个文件自动生成key（文件名）
    //             domain: 'image.quantahelp.com',     // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
    //             auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
    //             multi_selection: false,             //禁止选择多个文件
    //         }
    //         var init1 = {
    //             init: {
    //                 'FilesAdded': function (up, files) {
    //                     // 设置预览图地址
    //                 },
    //                 'FileUploaded': function (up, file, info) {
    //                     var domain = up.getOption('domain');
    //                     var res = JSON.parse(info);
    //                     var sourceLink = "http://" + domain + "/" + res.key;//目标地址
    //                     console.info(sourceLink);
    //                     console.log(_this.props.name);
    //                     _this.props.saveImg(_this.props.name, sourceLink);
    //                     _this.setState({modal: false});
    //                 },
    //                 'Error': function (up, err, errTip) {
    //                     //上传出错时，处理相关的事情
    //                     console.log(err);
    //                 },
    //                 'Key': function (up, file) {
    //                     var key = "";
    //                     return key
    //                 }
    //             }
    //         }
    //         var init2 = {
    //             init: {
    //                 'FilesAdded': function (up, files) {
    //                     // 设置预览图地址
    //                 },
    //                 'FileUploaded': function (up, file, info) {
    //                     var domain = up.getOption('domain');
    //                     var res = JSON.parse(info);
    //                     var sourceLink = "http://" + domain + "/" + res.key;//目标地址
    //                     console.info(sourceLink);
    //                     console.log(_this.props.name);
    //                     _this.props.saveImg(_this.props.name, sourceLink);
    //                     _this.setState({modal: false});
    //                 },
    //                 'Error': function (up, err, errTip) {
    //                     //上传出错时，处理相关的事情
    //                     console.log(err);
    //                 },
    //                 'Key': function (up, file) {
    //                     var key = "";
    //                     return key
    //                 }
    //             }
    //         }
    //         // var aimId2={browse_button: `${_this.props.inputID}${_this.props.files.length/4}`};
    //         // var option2 = Object.assign(commonOption, init2,aimId2);
    //         // var uploader1 = Qiniu2.uploader(option2);
    //         var aimId1 = {browse_button: `${this.props.inputID}134`};
    //         var option1 = Object.assign(commonOption, init1, aimId1);
    //         var uploader1 = Qiniu1.uploader(option1);
    //
    //         var aimId2 = {browse_button: `${this.props.inputID}135`};
    //         var option2 = Object.assign(commonOption, init2, aimId2);
    //         var uploader = Qiniu2.uploader(option2);
    //         setTimeout(() => this.setInput(1), 500)
    //     }
    // };

    setInput = (n) => {
        let number = n + 1;
        let camera1 = document.getElementById(`${this.props.inputID}134`);
        let camera2 = document.getElementById(`${this.props.inputID}135`);
        if (!camera1 || !camera2) return;
        // console.log(camera1.parentNode.children);
        if (camera1.parentNode.children.length === 2 && camera2.parentNode.children.length === 2) {
            camera1.nextSibling.style.zIndex = 2;
            camera1.nextSibling.style.width = 22.2 + 'vw';
            camera1.nextSibling.style.height = 8.3 + 'vw';
            camera1.nextSibling.firstChild.setAttribute('capture', 'camera');
            camera1.nextSibling.firstChild.setAttribute('accept', 'image/*');
            camera1.nextSibling.firstChild.removeAttribute('multiple');

            camera2.nextSibling.style.zIndex = 2;
            camera2.nextSibling.style.width = 22.2 + 'vw';
            camera2.nextSibling.style.height = 8.3 + 'vw';
        } else {
            console.log(number);
            if (number < 10) {
                setTimeout(() => this.setInput(number), 500)
            } else {
                alert('页面异常')
            }
        }
    };

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    };

    onDeleteChange = key => (files, type, index) => {
        if (type == 'remove') { //删除图片
            this.props.removeImg(key, files, index);
            console.log(this.props.files.length);
            if (files.length === this.props.num - 1) {
                // this.isLastPosition =true
                this.setState({isLastPosition: true})
            } else {
                this.setState({isLastPosition: false})
            }
        } else {
            this.setState({isLastPosition: false})
        }
    };

    render() {
        const {files} = this.props;
        return (
            <React.Fragment>
                <ImagePicker
                    files={files}
                    onChange={this.onDeleteChange(this.props.name)}
                    selectable={files.length < this.props.num}
                    className={this.props.name}
                    onAddImageClick={(e) => {
                        e.preventDefault();
                        this.setState({modal: true})
                    }}
                />
                <Modal
                    popup
                    visible={this.state.modal}
                    onClose={this.onClose('modal')}
                    animationType="slide-up"
                >
                    <div style={{
                        display: 'flex',
                        height: '20vw',
                        alignItems: 'center',
                        justifyContent: 'space-around'
                    }}>
                        <button>
                            <div id={`${this.props.inputID}134`}>拍照</div>
                        </button>
                        <button>
                            <div id={`${this.props.inputID}135`}>从相册选择</div>
                        </button>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}