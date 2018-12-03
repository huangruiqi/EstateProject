<template>
    <div class="housePage">
        <div class="page">
            <div class="houseChoose">
              <!-- <div class="clickType">+</div> -->
              <a class="houseTiao" :href=href style="display:none"/>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
window.haha = (that) => {
    $(that).prev().prev().click();
}


import qs from 'qs'
import {getUrl} from '../../../utils/urlGet.js'
import {checkChange} from '../../../utils/urlGet.js'
import {modify} from '../../../utils/urlGet.js'
import {modifyCome} from '../../../utils/urlGet.js'
import chachaPic from "../../../assets/img/chacha.png";
import addBig from "../../../assets/img/addPic.png";
import addHouseType from "../../../assets/img/addHouseType.png";
    export default {
        name: 'homepage',
        data() {
            return {
                "house": [],//为总体户型
                "select": "",
                "selectA":"",
                "href": "/#/houseDis/index",
                "numClick": 0,
                "template": '<div class="pageOne" style="display: none"><div class="content" name="proto"><div class="Title"><span>样板间</span></div><div class="pic"><div class="add"><img src="' + addBig + '"></div></div></div><div class="content" name="plan"><div class="Title"><span>户型图</span></div><div class="pic"><div class="addThree"><img src="' + addBig + '" id="ha" class="duTe"></div></div><div class="VR">是否需要全景图展示<input type="checkbox" name="是" value="是" class="checkBox"></div></div></div>',
                "tep": '<div class="clickType"></div><img src="'+ chachaPic +'" class="chaHouse">',
                "protoInnerOne": '<div class="add" ref="add"><img src="' + addBig + '"></div>',
                "protoInnerTwo": '<div class="addTwo" ref="addTwo"><img src="' + addBig + '" id="ha"></div>',
                "protoInnerThree": '<img src="' + addBig + '" class="duTe">',
                "picCate": ["样板间", "平面图", "3D视图"],
                "houseType": [],

                "formOne": {},
                "imgAddProto": [],
                "houseNum": 0,
                "addNum": 0,
                "addNumTwo": 0,
                "addNumThree": 0,
                "check": "true",
                "chaPic": require('../../../assets/img/cha.png'),//叉图片
                "star": require('../../../assets/img/star.png'),
                "duiPic": require('../../../assets/img/dui.png'),//√图片
                "addPic": require('../../../assets/img/addPic2.png'),
                "addHouse": require('../../../assets/img/addHouse.png'),
                "decrease": require('../../../assets/img/decrease.png'),
                "addBig": require('../../../assets/img/addPic.png'),
                "tankuang": require('../../../assets/img/tankuang.png'),
                "houseHanZi": ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十"]
            }
        },
        created() {
            //请求房间类型
            this.$axios.get("/house/roomtype")
            .then(res => {
                this.houseType = res.data.data;
            })
            .catch(error => {
            console.log(error);
            });
            //请求户型
            this.$axios.get("/house/housetype")
            .then(res => {
                this.house = res.data.data;
            })
            .catch(error => {
                console.log(error);
            });
        },
        mounted() {
            this.numClick = document.getElementsByClassName('clickType').length;//点击的
        },
        methods: {
            //添加数据
            addContent() {
                if (this.house != null) {
                    for (let i = 0; i < this.house.length; i++) {
                        this.numClick++;
                        document.getElementsByClassName('houseChoose')[0].innerHTML += this.tep;
                        document.getElementsByClassName('page')[0].innerHTML += this.template;
                        document.getElementsByClassName('clickType')[i].innerHTML = "户型" + this.houseHanZi[this.numClick - 1];
                        $('.pageOne').eq(0).css('display', 'flex');
                        document.getElementsByClassName('clickType')[0].style.backgroundColor = "#565d6d";
                        document.getElementsByClassName('chaHouse')[0].style.display = "block";
                        if(this.house[0].houseType.vrUrl) {
                            document.getElementsByClassName('chaHouse')[0].style.display = "none";
                        }
                        if(this.house[i]!= null) {
                            for (let a of this.house[i].houseSampleRooms) {
                                let addNum = $('.pageOne').eq(i).find('.add').length;
                                $('.pageOne').eq(i).find('.add')[addNum - 1].innerHTML = '<img src="'+ a.houseTypeImage.image.fileName +'"><img src="' + this.chaPic + '" id="cha" class="chaOne"><div class="bottomDiv">' + a.roomTypeName + '展示图</div>';
                                $('.pageOne').eq(i).find('.pic')[0].innerHTML += this.protoInnerOne;
                            }
                        }
                        if(this.house[i].housePlans[0] != null) {
                            $('.pageOne').eq(i).find('.addThree')[0].innerHTML = '<img src="'+ this.house[i].housePlans[0].houseTypeImage.image.fileName +'"><img src="' + this.chaPic + '" id="cha" class="chaThree">';
                        }
                        // document.getElementsByClassName('checkBox')[i].checked='';
                    }
                    for (let i = 0; i < this.house.length; i++) {
                        if(this.house[i].houseType.vrUrl) {
                            $('.checkBox').eq(i).prop("checked", true);
                        }
                    }
                    this.numClick++;
                    document.getElementsByClassName('houseChoose')[0].innerHTML += '<img class="clickType" id="addHouseType" src="' + addHouseType + '">';
                }else {
                    // document.getElementsByClassName('houseChoose')[0].innerHTML += this.tep;
                    // document.getElementsByClassName('page')[0].innerHTML += this.template;
                    document.getElementsByClassName('houseChoose')[0].innerHTML += '<img class="clickType" id="addHouseType" src="' + addHouseType + '">';
                    this.numClick++;
                }
            },
            //点击下方增加户型
            addClick() {
                if(document.getElementsByClassName('clickType')[this.numClick - 1]) {
                document.getElementsByClassName('clickType')[this.numClick - 1].onclick = () => {
                    // this.numClick++;
                    // document.getElementsByClassName('houseChoose')[0].innerHTML += this.tep;
                    // document.getElementsByClassName('page')[0].innerHTML += this.template;
                    // document.getElementsByClassName('clickType')[this.numClick - 1].innerHTML = "+";
                    // document.getElementsByClassName('clickType')[this.numClick - 2].innerHTML = "";
                    let result = confirm("确定要增加户型吗");
                    if(result) {
                        let config={
                             'Content-Type': 'application/x-www-form-urlencoded' 
                        }
                        this.$axios.post('/house/housetype',qs.stringify({name: "1"}),config).then((res) => {alert("添加成功！");this.$router.go(0);}).catch(function(err){console.log(err)})
                    } 
                }
                }
            },
            //删除户型
            removeHouse() {
                if($('.pageOne') && $('.page').eq(0).find('.chaHouse')[0]) {
                    for (let i = 0; i < $('.pageOne').length; i++) {
                        $('.page').eq(0).find('.chaHouse')[i].onclick = () => {
                            let result = confirm("确定要删除该户型吗");
                            if (result) {
                                    const houseType =  this.house[i].houseType.id;
                                    let config={
                                    
                                    }
                                    this.$axios.delete('/house/housetype/'+houseType).then((res) => {alert('删除成功！');this.$router.go(0);}).catch(function(err){console.log(err)})
                                
                                // }
                            }
                        }
                    }
                }
            },

            //点击下方点选择户型
            clickType() {
                for (let i = 0;i < document.getElementsByClassName('clickType').length - 1; i++) {
                    document.getElementsByClassName('clickType')[i].onclick = () => {
                        for(let a = 0; a < document.getElementsByClassName('clickType').length - 1; a++) {
                            document.getElementsByClassName('clickType')[a].style.backgroundColor = "#9ea6b1";
                            document.getElementsByClassName('chaHouse')[a].style.display = "none";
                        }
                        for(let a = 0; a < document.getElementsByClassName('clickType').length - 1; a++) {
                            document.getElementsByClassName('pageOne')[a].style.display = "none";
                        }
                        document.getElementsByClassName('pageOne')[i].style.display = "flex";
                        document.getElementsByClassName('clickType')[i].style.backgroundColor = "#304156";
                        document.getElementsByClassName('chaHouse')[i].style.display = "block";
                        if(this.house[i].houseType.vrUrl) {
                            document.getElementsByClassName('chaHouse')[i].style.display = "none";
                        }
                    }
                }
            },
            reGet(i, j) {
                this.$axios.get("/house/roomtype")
                .then(res => {
                    this.houseType = res.data.data;
                })
                .catch(error => {
                console.log(error);
                });
                //请求户型
                this.$axios.get("/house/housetype")
                .then(res => {
                    this.houseA = res.data.data;
                    // console.log(this.houseA);
                    // console.log(this.houseA[i]);
                    if(this.houseA && this.houseA[i] && j == 0) {
                        document.getElementsByClassName('pageOne')[i].getElementsByClassName('pic')[j].innerHTML = '';
                        document.getElementsByClassName('pageOne')[i].getElementsByClassName('pic')[j].innerHTML += this.protoInnerOne;
                        for (let a of this.houseA[i].houseSampleRooms) {
                            let addNum = $('.pageOne').eq(i).find('.add').length;
                            $('.pageOne').eq(i).find('.add')[addNum - 1].innerHTML = '<img src="'+ a.houseTypeImage.image.fileName +'"><img src="' + this.chaPic + '" id="cha" class="chaOne"><div class="bottomDiv">' + a.roomTypeName + '展示图</div>';
                            document.getElementsByClassName('pageOne')[i].getElementsByClassName('pic')[j].innerHTML += this.protoInnerOne;
                        }
                    }    
                    if(this.houseA && this.houseA[i] && j == 1 && this.houseA[i].housePlans[0]) {
                        $('.pageOne').eq(i).find('.addThree')[0].innerHTML = '<img src="'+ this.houseA[i].housePlans[0].houseTypeImage.image.fileName +'"><img src="' + this.chaPic + '" id="cha" class="chaThree">';
                    }else if (!this.houseA[i].housePlans[0]) {
                        $('.pageOne').eq(i).find('.addThree')[0].innerHTML = this.protoInnerThree;
                    }             
                    document.getElementsByClassName('clickType')[i].click();  
                })
                .catch(error => {
                    console.log(error);
                });
                // this.addContent();
                // $('pageOne').eq(i).find('pic')[j].empty();       

            },
            //增加每个户型每类图片
            addProto() {
                if ($('.pageOne') != null) {
                    for (let i = 0; i < $('.pageOne').length; i++) {
                        let addNum = $('.pageOne').eq(i).find('.add').length;
                        this.select = '';
                        if(this.houseType != null ) {
                            for (let a of this.houseType) {
                                this.select += '<option value="'+ a.id +'" >'+ a.name +'</option>';
                            }
                            // console.log(this.select);
                        //  method="post" enctype="multipart/form-data"http://192.168.43.127:8080/house/image
                            let form = '<div class="mark"><div class="form"><div class="markTitle">户型' + this.houseHanZi[i] + '</div><form action=""><label style="display:none">户型：</label><input style="display:none" type="text" name="houseTypeId" value="'+this.house[i].houseType.id+'" disabled="disabled"><label style="display:none">图片类别：</label><input style="display:none" type="text" name="kind" value=1 disabled="disabled"><label>房间类型：</label><select class="houseType" name="roomTypeId">' + this.select + '</select><img src="'+ this.addHouse +'" class="addHouse"><img class="addHouse" src="'+ this.decrease +'"><br><label>文件上传:</label><input type="file" name="file" name="pic" style="display:none" ><br><img src="'+this.addPic+'" onclick="haha(this)" class="shangchuan"><br><span><img src="' + this.star + '">支持jpg / png，图片大小不超过10M</span><div class="button"><input type="button" value="取消" class="addPic" id="cancel"><input type="button" value="确定" class="addPic" id="addPic"></div></form><div></div>';
                            if ($('.pageOne').eq(i).find('.add')[addNum - 1]) {
                                $('.pageOne').eq(i).find('.add')[addNum - 1].onclick = () => {
                                    $('.pageOne').eq(i).append(form);
                                    $('.form').eq(0).find('input')[2].onchange = () => {
                                        $('.form').eq(0).find('img')[2].src = getUrl($('.form').find('input')[2].files[0]);
                                    }
                                    document.getElementById('addPic').onclick = () => {
                                        this.sub(i);
                                    }
                                    document.getElementById('cancel').onclick = () => {
                                        // this.$router.go(0);
                                        // this.$router.push({path: '/houseDis/index', query:{val:}});
                                        let mark = document.getElementsByClassName('mark')[0];
                                        mark.parentNode.removeChild(mark);
                                        // this.href= '';
                                        // document.getElementsByClassName('houseTiao')[0].click();
                                    }
                                }
                            }
                        }else {
                            let form = '<div class="mark"><div class="form"><div class="markTitle">户型' + this.houseHanZi[i] + '</div><form action=""><label style="display:none">户型：</label><input style="display:none" type="text" name="houseTypeId" value="'+this.house[i].houseType.id+'" disabled="disabled"><label style="display:none">图片类别：</label><input style="display:none" type="text" name="kind" value=1 disabled="disabled"><label>房间类型：</label><select class="houseType" name="roomTypeId">' + this.select + '</select><img src="'+ this.addHouse +'" class="addHouse"><img class="addHouse" src="'+ this.decrease +'"><br><label>文件上传:</label><input type="file" name="file" name="pic" style="display:none" ><br><img src="'+this.addPic+'" onclick="haha(this)" class="shangchuan"><br><span><img src="' + this.star + '">支持jpg / png，图片大小不超过10M</span><div class="button"><input type="button" value="取消" class="addPic" id="cancel"><input type="button" value="确定" class="addPic" id="addPic"></div></form><div></div>';
                            $('.pageOne').eq(i).find('.add')[addNum - 1].onclick = () => {
                                $('.pageOne').eq(i).append(form);
                                $('.form').eq(0).find('input')[2].onchange = () => {
                                    $('.form').eq(0).find('img')[2].src = getUrl($('.form').find('input')[2].files[0]);
                                }
                                document.getElementById('addPic').onclick = () => {
                                    this.sub(i);
                                }
                                document.getElementById('cancel').onclick = () => {
                                    let mark = document.getElementsByClassName('mark')[0];
                                    mark.parentNode.removeChild(mark);
                                }
                            }
                        }
                
                    }
                }
            },
            sub(i) {
                if (isNaN($(".houseType option:selected").val()) || $('.form').find('input')[2].value == "") {
                    alert("不能为空，添加失败!");
                    // this.$router.push('/houseDis/index');
                    let mark = document.getElementsByClassName('mark')[0];
                    mark.parentNode.removeChild(mark);
                    // this.$router.go(0);
                    return false;
                }
                else { 
                    let formdata = new FormData();
                    let options=$(".houseType option:selected");
                    let a = options.val();
                    formdata.append('houseTypeId', $('.form').find('input')[0].value);
                    formdata.append('kind', $('.form').find('input')[1].value);
                    formdata.append('roomTypeId', a);
                    formdata.append('file', $('.form').find('input')[2].files[0]);
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'  
                        }
                    }
                    this.$axios.post('/house/image', formdata, config).then( (res) => {alert("上传成功！");
                    }).catch((error) =>{
                    });
                    let w = setTimeout(() => {
                        // this.$router.go(0);
                        
                        let mark = document.getElementsByClassName('mark')[0];
                        mark.parentNode.removeChild(mark);
                        this.reGet(i, 0);
                                    // this.href= '';
                                    // document.getElementsByClassName('houseTiao')[0].click();
                    }, 4000);
                    // window.location.href = '/houseDis/index';
                    return false; 
                }
            },
            subTwo(i) {
                if ($('.form').find('input')[2].value == "") {
                    alert("不能为空，添加失败!");
                    let mark = document.getElementsByClassName('mark')[0];
                    mark.parentNode.removeChild(mark);
                    return false;
                }
                else { 
                    let formdata = new FormData();
                    formdata.append('houseTypeId', $('.form').find('input')[0].value);

                    formdata.append('kind', $('.form').find('input')[1].value);
                    formdata.append('file', $('.form').find('input')[2].files[0]);
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
                        }
                    }
                    this.$axios.post('/house/image', formdata, config).then( (res) => {alert('上传成功！');
                    let w = setTimeout(() => {
                        let mark = document.getElementsByClassName('mark')[0];
                        mark.parentNode.removeChild(mark);
                        this.reGet(i, 1);
                    }, 3000);
                    }).catch((error) =>{
                    });
                    return false; 
                }
            },
            getCateHouse() {
                let addHouseType = document.getElementsByClassName('addHouseType')[0];
                addHouseType.parentNode.removeChild(addHouseType);
                this.$axios.get("/house/roomtype")
                .then(res => {
                    this.houseType = res.data.data;
                    this.select = '';
                    for (let a of this.houseType) {
                        this.select += '<option value="'+ a.id +'" >'+ a.name +'</option>';
                        // console.log(this.select);
                        document.getElementsByClassName('houseType')[0].innerHTML = this.select;
                    }  
                })
                .catch(error => {
                console.log(error);
                });             
            },
            //增加房间类型
            addHouseType() {
                if (document.getElementsByClassName('addHouse')[0]) {
                    document.getElementsByClassName('addHouse')[0].onclick = () => {
                        let add = '<div class="addHouseType"><div class="houseTitle">增加房间类型<img src="' + this.tankuang + '" id="chaHouse"></div><form action=""><input type="text" name="house" id="addI" maxlength="5" class="addType"><input type="button" value="确定" id="add"></form></div>';
                        $('.mark').append(add);
                        document.getElementById('add').onclick = () => {
                            this.subHouse();
                        }
                        document.getElementById('chaHouse').onclick = () => {
                            let addHouseType = document.getElementsByClassName('addHouseType')[0];
                            addHouseType.parentNode.removeChild(addHouseType);
                        }
                    }
                }
            },
            subHouse() {
                // console.log($('input')[6]);
                if ($('.addType')[0].value == "") {
                    alert("不能为空，添加失败!");
                    // this.$router.go(0);
                    let addHouseType = document.getElementsByClassName('addHouseType')[0];
                    addHouseType.parentNode.removeChild(addHouseType);
                    return false;
                }
                else { 
                    let config = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'  //之前说的以表单传数据的格式来传递fromdata
                        }
                    }
                    this.$axios.post('/house/roomtype',qs.stringify({
                                name: $('.addType')[0].value
                            }),config).then( (res) => {
                                alert("上传成功！");
                                this.getCateHouse();
                            }).catch((error) =>{

                            });
                        // this.$router.go(0);
                        return false; 
                    }
            },
            //删除房间类型
            decreseHouseType() {
                if (document.getElementsByClassName('addHouse')[1]) {
                    document.getElementsByClassName('addHouse')[1].onclick = () => {
                        // let select = '';
                        this.selectA = '';
                        for (let a of this.houseType) {
                            this.selectA += '<option value="'+ a.id +'">'+ a.name +'</option>';
                        }
                        let add = '<div class="addHouseType"><div class="houseTitle">减少房间类型<img src="' + this.tankuang + '" id="chaHouse"></div><form action="" ><select name="houseTypeTwo" class="houseTypeTwo">' + this.selectA + '</select><input type="button" value="确定" id="delete"></form></div>';
                        $('.mark').append(add);
                        // $('#delete').click(() => {
                        //     this.subHouseTwo();
                        // });
                        document.getElementById('delete').onclick = () => {
                            this.subHouseTwo();
                        }
                        document.getElementById('chaHouse').onclick = () => {
                            let addHouseType = document.getElementsByClassName('addHouseType')[0];
                            addHouseType.parentNode.removeChild(addHouseType);
                        }
                    }
                }
            },
            subHouseTwo() {
                if($('.houseTypeTwo')) {
                    if ($('.houseTypeTwo').value == "") {
                        alert("不能为空，删除失败!");
                        let addHouseType = document.getElementsByClassName('addHouseType')[0];
                        addHouseType.parentNode.removeChild(addHouseType);
                        return false;
                    }
                    else { 
                        let options=$(".houseTypeTwo option:selected");
                        let a = options.val();
                        let config = {
               
                        };
                        this.$axios.delete('/house/roomtype/'+a,config)
                            .then( (res) => {
                                // console.log(res);
                                alert('删除成功！');
                                this.getCateHouse();
                                // this.$router.go(0);

                            }).catch((error) =>{
                                // console.log();
                        });
                        
                        return false; 
                    }
                }
                
            },
            addPlan() {
                if ($('.pageOne')) {
                    for (let i = 0; i < $('.pageOne').length; i++) {
                        let select = '';
                        var str = $('.content').eq(i*2+1).find('img')[0].src;
                        var reg = RegExp(/XOJL6Gn/);
                        if(reg.exec(str)){
                            // 包含        
                        }
                        // console.log($('.content').eq(1).find('img')[0].src);
                            let form = '<div class="mark"><div class="form"><div class="markTitle">户型' + this.houseHanZi[i] + '</div><form action=""><label style="display:none">户型：</label><input style="display:none" type="text" name="houseTypeId" value="'+this.house[i].houseType.id+'" disabled="disabled"><label style="display:none">图片类别：</label><input style="display:none" type="text" name="kind" value=2 disabled="disabled"><label>文件上传:</label><input type="file" name="file" name="pic" style="display:none" ><br><img src="'+this.addPic+'" onclick="haha(this)" class="shangchuan"><br><span><img src="' + this.star + '">支持jpg / png，图片大小不超过10M</span><div class="button"><input type="button" value="取消" class="addPic" id="cancel"><input type="button" value="确定" class="addPic" id="addPic"></div></form><div></div>';
                                if($('.pageOne').eq(i).find('.addThree')[0] && reg.exec(str)) {
                                    $('.pageOne').eq(i).find('.addThree')[0].onclick = () => {
                                        // if($(ev.target) != $('.pageOne').eq(i).find('.addThree')[0]) {alert(4); return 0;}
                                        // else {
                                            $('.pageOne').eq(i).append(form);
                                            $('.form').eq(0).find('input')[2].onchange = () => {
                                                
                                                $('.form').eq(0).find('img')[0].src = getUrl($('.form').find('input')[2].files[0]);
                                            }
                                            document.getElementById('addPic').onclick = () => {
                                                this.subTwo(i);
                                            } 
                                            document.getElementById('cancel').onclick = () => {
                                                let mark = document.getElementsByClassName('mark')[0];
                                                mark.parentNode.removeChild(mark);
                                            }
                                        // }

                                    }
                                }
                                
                            // }  
                        // }
                                    
                    }
                }
            },

            //删除图片
            removeProto() {
                if($('.pageOne')) {
                    for (let i = 0; i < $('.pageOne').length; i++) {
                        for (let j = 0; j < $('.pageOne').eq(i).find('.add').length - 1 && $('.pageOne').eq(i).find('.chaOne')[j]; j++) {
                            $('.pageOne').eq(i).find('.chaOne')[j].onclick = () => {
                                for (let k = j; k < $('.pageOne').eq(i).find('.add').length - 1; k++) {
                                    $('.pageOne').eq(i).find('.add')[k].innerHTML = $('.pageOne').eq(i).find('.add')[k + 1].innerHTML;
                                }
                                let numOne = $('.pageOne').eq(i).find('.add').length;
                                let protoChild = $('.pageOne').eq(i).find('.add')[numOne-1];
                                protoChild.parentNode.removeChild(protoChild);
                                let result = confirm("确定要删除这张图片吗");
                                if(result) {
                                    const id =  this.house[i].houseSampleRooms[j].houseTypeImage.id;
                                    if (id) {
                                        let config={
                                        

                                        }
                                        this.$axios.delete('/house/image/'+id).then((res) => {this.reGet(i, 0);}).catch(function(err){console.log(err)})
                                    }
                                }
                            }
                        }
                    }
                }
            },
            removePlan() {
                if($('.pageOne')) {
                    for (let i = 0; i < $('.pageOne').length; i++) {
                        if ($('.pageOne').eq(i).find('.chaThree')[0]) {
                            $('.pageOne').eq(i).find('.chaThree')[0].onclick = (e) => {
                                e.stopPropagation();
                                let result = confirm("确定要删除这张图片吗");
                                if(result) {
                                    const id =  this.house[i].housePlans[0].houseTypeImage.id;
                                    if (id) {
                                        let config={

                                        }
                                        this.$axios.delete('/house/image/'+id).then((res) => {alert("删除成功！");this.reGet(i, 1);}).catch(function(err){console.log(err)})
                                        }
                                }
                            }
                        }
                    }
                }
            },
            //获取模块
            getModule() {
                if(document.getElementsByClassName('module')[0].checked) {
                    this.$emit('getModule', 4);
                }else {
                    this.$emit('getModule', 0);
                }
            }
        },
        watch: {
            house() {
                this.addContent();
                let timer = setInterval(() => {
                    this.addClick();
                    this.clickType();
                    this.addProto();
                    // this.addThree();
                    this.addPlan();
                    this.addHouseType();
                    this.decreseHouseType();
                    this.removeProto();
                    // this.removeThree();
                    this.removePlan();
                    this.removeHouse();
                },100);
            }
        }
    }
</script>

<style lang="scss">
@import "../../../styles/main.scss";
@import "../../../styles/mixin.scss";


#dui {
    width: px2rem(50);
    height: px2rem(50);
    float: left;
    margin-top: px2rem(98);
    margin-left: -33px;
    visibility: hidden;
}

.Title {
    width: 100%;
    height: px2rem(70);
    border-bottom: px2rem(2) solid #dfdfdf;
    // background-color: black;
    @include sc(px2rem(24),#3d455a);
    font-weight: 500;
    @include fj();
    span {
        display: block;
        margin-left: px2rem(51);
        margin-top: px2rem(23);

    }
    img {
        width: px2rem(40);
        height: px2rem(40);
        cursor: pointer;
    }
}


.mark {
    width: 100%;
    height: 100%;
    background: rgba(61,69,90,.6);
    position: absolute;
    top: 0;
    left: px2rem(200);
    .addHouseType {
        width: px2rem(235);
        height: px2rem(202);
        // border: px2rem(2) solid white;
        border-radius: px2rem(4);
        background-color: #fff;
        @include sc(px2rem(30), #304156);
        font-weight: 600;
        float: left;
        margin: -430px px2rem(1114);

        .houseTitle {
            width: 100%;
            height: px2rem(50);
            background-color: #565d6d;
            border-top-left-radius: px2rem(4);
            border-top-right-radius: px2rem(4);
            @include sc(px2rem(18), white);
            letter-spacing: px2rem(1);
            display: flex;
            align-items: center;
            justify-content: space-around;
            img {
                width: px2rem(14);
                height: px2rem(14);
                cursor: pointer;
            }
        }
        select {
            width: px2rem(199);
            height: px2rem(26);
            @include sc(px2rem(16), #565d6d);
            border-radius: px2rem(4);
            border: 0;
            background-color: #edf0f5;
            margin: px2rem(42) px2rem(18);
            option {
                background-color: #D8DDE7;
            }   
        }
        #addI {
            width: px2rem(199);
            height: px2rem(26);
            background-color: #edf0f5;
            border-radius: px2rem(4);
            border: 0;
            margin: px2rem(42) px2rem(18);
            @include sc(px2rem(16), #565d6d);
        }
        input[type=button] {
            border-radius: px2rem(4);
            border: 0;
            width: px2rem(80);
            height: px2rem(34);
            background-color: #565d6d;
            @include sc(px2rem(14), white);
            position: relative;
            top: -20px;
            left: 50px;
        }
    }
    .form {
        width: px2rem(400);
        height: px2rem(447);
        border-radius: px2rem(4);
        background-color: white;
        @include sc(px2rem(30), #304156);
        font-weight: 600;
        margin: px2rem(200) px2rem(700);
        .markTitle {
            width: 100%;
            height: px2rem(50);
            background-color: #565d6d;
            border-top-left-radius: px2rem(4);
            border-top-right-radius: px2rem(4);
            @include fj(center);
            align-items: center;
            @include sc(px2rem(18), white);
        }
        form {
            width: px2rem(280);
            height: px2rem(315);
            margin: px2rem(36) auto;
            // background-color: black;
            span {
                font-size: px2rem(12);
                color: #9ea6b1;
                line-height: 21px;
	            letter-spacing: 0px;
                display: block;
                margin-top: -6px;
                img {
                    width: px2rem(8);
                    height: px2rem(7);
                }
            }
            
            label {
                @include sc(px2rem(20), #565d6d);
                letter-spacing: px2rem(1);
            }
            select {
                width: px2rem(105);
                height: px2rem(26);
                @include sc(px2rem(14), #565d6d);
                border-radius: px2rem(4);
                border: 0;
                background-color: #edf0f5;
                option {
                    background-color: #D8DDE7;
                    width: px2rem(105);
                    height: px2rem(26);
                    border: px2rem(1) solid black;
                }
            }
        }
        input {
            border: px2rem(2) solid #304156;
        }
        // input[type=button] {
        //     margin: px2rem(25) px2rem(300);
        // }
        .shangchuan {
            width: px2rem(280);
            height: px2rem(170);
            margin-top: px2rem(10);
        }
        .addHouse {
            width: px2rem(26);
            height: px2rem(26);
            margin-left: px2rem(6);
            position: relative;
            top: px2rem(8);
            cursor: pointer;
            border: 0;
        }
        .button {
            width: 100%;
            height: px2rem(34);
            margin-top: px2rem(20);
            @include fj();
            .addPic {
                width: px2rem(126);
                height: px2rem(34);
                @include sc(px2rem(16), #565d6d);
                background-color: #edf0f5;
                border-radius: px2rem(4);
                border: 0;
                cursor: pointer;
            }
            .addPic:hover {
                background-color: #565d6d;
                @include sc(px2rem(16), white);
            }
        }
    }
}
.housePage {
    width: 100%;
    height: px2rem(930);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #EDF0F5;
    .module {
        position: absolute;
        left: 100px;
        top: 30px;
        zoom: 180%;
    }
    .page {
        margin-top: -20px;
        width: px2rem(1455);
        height: px2rem(750);
        // border: px2rem(2) solid #304156;
        .pageOne {
            width: 100%;
            height: 100%;
            display: flex;
            // background-color:black;
            flex-direction: column;
            justify-content: space-between;
            .content {
                width: 100%;
                height: px2rem(360);
                background-color: #fff;
                display: flex;
                flex-wrap: wrap;
                overflow: scroll;
                overflow-x: hidden;
                .VR {
                    position: relative;
                    left: 86%;
                    color: #9ea6b1;
                    font-weight: 600;
                    input {
                        position: relative;
                        top: px2rem(5)
                    }
                }
                .pic {
                    width: px2rem(1342);
                    height: px2rem(199);
                    margin-left: px2rem(25);
                    // margin-top: px2rem(42);
                    // background-color: black;
                    .add {
                        width: px2rem(245);
                        height: px2rem(199);
                        float: left;
                        margin-left: px2rem(20);
                        @include fj(center);
                        align-items: center;
                        // border: px2rem(2) solid #304156;
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        cursor: pointer;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                        #cha {
                            width: px2rem(25);
                            height: px2rem(25);
                            float: left;
                            margin-top: -110px;
                            margin-left: -20px;
                            visibility: hidden;
                        }
                        .bottomDiv {
                            width: 100%;
                            height: px2rem(40);
                            background-color: #3d455a;
                            float: left;
                            margin-left: -98%;
                            margin-top: px2rem(160);
                            opacity: 0.8;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            @include sc(px2rem(16), white);
                            visibility: hidden;
                        }
                    
                    }
                    .add:hover {
                        // border: px2rem(4) solid red;
                        #cha {
                                visibility: visible;
                        }
                        #dui {
                            visibility: visible;
                        }
                        .bottomDiv {
                            visibility: visible;
                        }
                    }
                    .addTwo:hover {
                        // border: px2rem(4) solid red;
                        #cha {
                            visibility: visible;
                        }
                        #dui {
                            visibility: visible;
                        }
                    }
                    .addThree:hover {
                        // border: px2rem(4) solid red;
                        #cha {
                            visibility: visible;
                        }
                        #dui {
                            visibility: visible;
                        }
                    }
                    .addThree {
                        width: px2rem(245);
                        height: px2rem(199);
                        margin-left: px2rem(20);
                        @include fj(center);
                        align-items: center;
                        // border: px2rem(2) solid #304156;
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        cursor: pointer;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                        #cha {
                            width: px2rem(25);
                            height: px2rem(25);
                            float: left;
                            margin-top: -110px;
                            margin-left: -20px;
                            visibility: hidden;
                        }
                    }
                }
            }
        }
    }
    .houseChoose {
        width: 70%;
        height: px2rem(80);
        @include fj(center);
        align-items: center;
        cursor: pointer;
        position: absolute;
        top: 90%;
        left: 20%;
        // left: 300px;
        #addHouseType {
            width: px2rem(34);
            height: px2rem(34);
        }
        .chaHouse {
            width: px2rem(20);
            height: px2rem(20);
            margin-top: -15px;
            margin-left: -10px;
            display: none;
        }
        .clickType {
            height: px2rem(34);
            width: px2rem(100);
            background-color: #9ea6b1;
            font-size: px2rem(16);
            @include sc(px2rem(16), white);
            font-weight: 500;
            @include fj(center);
            align-items: center;
            border-radius: px2rem(4);
            margin-left: px2rem(16);

        }
        div:hover {
            background-color: #304156;
            color: #fff;
        }
    }
}
</style>
