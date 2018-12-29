import React from 'react'
import BMap from 'BMap'
import scaleData from "./scaleData";
import picture from './emoji.jpg'

/**
 * @param distance 实际距离
 * @returns 像素距离
 */
function RealDistanceTranPixels(distance) {
    let zoom = map.getZoom();
    let pixDistance;
    for (let i=0;i<scaleData.length;i++){
        if(scaleData[i].zoom === zoom){
            let scale = scaleData[i].Pixels / scaleData[i].length;
            pixDistance = scale * distance
        }
    }
    return pixDistance
}

// 复杂的自定义覆盖物
function ComplexCustomOverlay(point, radiusM){
    this._point = point;
    this._img = '';
    this._radiusP = RealDistanceTranPixels(radiusM);
}
let map;
export default class extends React.Component {

    constructor(props){
        super(props);
        this.imgUrl = picture;
    }

    componentDidMount(){
        map = new BMap.Map('map_canvas');
        map.enableScrollWheelZoom(true);
        map.enableDragging();
        //定位
        let opts = {
            anchor:BMAP_ANCHOR_BOTTOM_LEFT,
            offset: new BMap.Size(15, 150), //此偏移量是由左下角建立的坐标系
            showAddressBar:false, //是否显示定位信息面板。默认显示定位信息面板
        };
        this.customize();
        map.addControl(new BMap.ScaleControl(opts));
        map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));

        let geolocation = new BMap.Geolocation();
        let _this =this;
        geolocation.getCurrentPosition(function (r) {
            map.centerAndZoom(r.point,15);
            let circle = new BMap.Circle(r.point,10, {fillColor:'black', strokeWeight:1, strokeColor:'red'});
            console.log(circle.getBounds());
            map.addOverlay(circle);
            _this.drawCircle(r.point);
            _this.point = r.point;

        });

        map.addEventListener('zoomend' ,()=>{
            let overlays = map.getOverlays();
            for (let i = 0; i < overlays.length; i++) {
                map.removeOverlay(overlays[i])
            }
            this.point?this.drawCircle(this.point):null;
        })
    }

    customize =()=>{
        let _this = this;
        ComplexCustomOverlay.prototype = new BMap.Overlay();
        ComplexCustomOverlay.prototype.initialize = function (mp) {
            console.log(this);
            var div = this._div = document.createElement("div");
            div.style.position = "absolute";
            div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
            div.style.color = "white";
            let img = this._img = document.createElement("img");
            img.src = _this.imgUrl;
            img.style.borderRadius = '50%';
            img.style.height = 2 * this._radiusP + 'px';
            img.style.width = 2 * this._radiusP + 'px';
            div.appendChild(img);

            mp.getPanes().markerPane.appendChild(div);
            return div;
        };
        ComplexCustomOverlay.prototype.draw = function () {
            let pixel = map.pointToOverlayPixel(this._point);
            console.log(pixel);
            this._div.style.left = pixel.x - this._img.width/2 + "px";
            this._div.style.top  = pixel.y - this._img.height/2 + "px";
        };
    };

    drawCircle = (point) =>{
        let myOverlay = new ComplexCustomOverlay(point,1000);
        map.addOverlay(myOverlay);
    };

    render(){
        return (
            <div>
                <div id='map_canvas' style={{width: '100%', height: '100vh', overflow: 'hidden', position:'fixed', top: 0}}/>
            </div>
        )
    }
}