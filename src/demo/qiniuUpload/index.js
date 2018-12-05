import React from 'react'
import ImgQiniu from './qiniu-upload'

export default class Upload extends React.Component(){

    constructor(props){
        super(props);
        this.state= {
            files1: [],
        };
    }

    removeImg = (key, files, index) => {
        this.setState({
            [key]: files,
        });
    };

    saveImg = (key, file) => {//保存添加
        let files = this.state[key];
        files.push({url: file});
        this.setState({
            [key]: files
        });
    };

    render(){
        let {files1} = this.state;
        return (
            <div>
                <ImgQiniu
                    files={files1}
                    name='files1'
                    inputID='files1'
                    saveImg={this.saveImg}
                    removeImg={this.removeImg}
                    num={3}
                />
            </div>
        )
    }
}
/*
module.exports = {
    entry: path.resolve(__dirname, 'src/qiniu.js'),
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'qiniu.min.js',
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    ]
};*/
