<template>
    <div class="housePage">
        <div class="page">
           
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
window.haha = (that) => {
    $(that).prev().prev().click();
}
import qs from 'qs'
import {getUrl} from '../../utils/urlGet.js'
import {checkChange} from '../../utils/urlGet.js'
import {modify} from '../../utils/urlGet.js'
import {modifyCome} from '../../utils/urlGet.js'
import chachaPic from "../../assets/img/chacha.png";
import addBig from "../../assets/img/addPic.png";
import addHouseType from "../../assets/img/addHouseType.png";

    export default {
        name: 'homepage',
        data() {
            return {
                "park": {},
                "template": '<div class="pageOne" ><div class="content" name="proto"><div class="Title"><span>公共设施</span></div><div class="pic"><div class="add"><img src="' + addBig + '"></div></div></div><div class="content" name="plan"><div class="Title"><span>园林景观</span></div><div class="pic"><div class="addTwo"><img src="' + addBig + '"></div></div></div></div>',
                "tep": '<div class="clickType"></div><img src="'+ chachaPic +'" class="chaHouse">',
                "protoInnerOne": '<div class="add" ref="add"><img src="' + addBig + '"></div>',
                "protoInnerTwo": '<div class="addTwo" ref="addTwo"><img src="' + addBig + '"></div>',
                "picCate": ["公共设施", "园林景观"],
                "addPic": require('../../assets/img/addPic2.png'),
                "imgAddProto": [],
                "parkType": [],
                "houseNum": 4,
                "addNum": 0,
                "select": "",
                "addNumTwo": 0,
                "addNumThree": 0,
                "check": "true",
                "chaPic": require('../../assets/img/cha.png'),
                "star": require('../../assets/img/star.png'),
                "fileClick": "document.getElementsByName('imgHouseBack')[0].click()",
                "fileClickTwo": "document.getElementsByName('imgHouseBackTwo')[0].click()",
                "fileClickThree": "document.getElementsByName('imgHouseBackThree')[0].click()",
                "addHouse": require('../../assets/img/addHouse.png'),
                "tankuang": require('../../assets/img/tankuang.png'),
                "decrease": require('../../assets/img/decrease.png')
            }
        },
        created() {
            //请求公园类型
            this.$axios.get("/landscape/placetype")
            .then(res => {
                // console.log(res.data.data);
                this.parkType = res.data.data;
                // this.houseType = res.data;
            })
            .catch(error => {
            console.log(error);
            });
            //请求户型
            this.$axios.get("/landscape/images")
            .then(res => {
                // console.log(res.data.data.landscapeDto);
                this.park = res.data.data.landscapeDto;
            })
            .catch(error => {
                console.log(error);
            });
        },
        mounted() {
            
        },
        methods: {
            //添加数据
            addContent() {
                if (this.park != null) {
                    document.getElementsByClassName('page')[0].innerHTML += this.template;
                    if (this.park.common) {
                        for (let a of this.park.common) {
                            let addNum = $('.add').length;
                            // $('.pageOne').eq(i).find('.add')[addNum - 1].innerHTML = '<img src="'+ a.houseTypeImage.image.fileName +'"><img src="' + this.chaPic + '" id="cha" class="chaOne"><div class="bottomDiv">' + a.roomTypeName + '展示图</div>';
                            $('.add')[addNum - 1].innerHTML = '<img src="'+ a.landscapeTypeImage.image.fileName +'"><img src="' + this.chaPic + '" id="cha" class="chaOne"><div class="bottomDiv">' + a.placeTypeName + '图</div>';
                            $('.pic')[0].innerHTML += this.protoInnerOne;
                        }
                    }
                    if (this.park.park) {
                        for (let a of this.park.park) {
                            let addNumTwo =  $('.addTwo').length;
                            $('.addTwo')[addNumTwo - 1].innerHTML = '<img src="'+ a.landscapeTypeImage.image.fileName +'"><img src="' + this.chaPic + '" id="cha" class="chaTwo"><div class="bottomDiv">' + a.placeTypeName + '图</div>';
                            $('.pic')[1].innerHTML += this.protoInnerTwo;
                        }
                    }
                }else {
                    document.getElementsByClassName('page')[0].innerHTML += this.template;
                }
            },
            //增加每个户型每类图片
            addProto() {
                    let addNum = $('.add').length;
                    this.select = '';
                    if (this.parkType) {
                        for (let a of this.parkType) {
                            this.select += '<option value="'+ a.id +'">'+ a.name +'</option>';
                        }
                        let form = '<div class="mark"><div class="form"><div class="markTitle">上传图片</div><form action=""><label style="display:none">图片类别：</label><input style="display:none"  type="text" name="catePic" value="1" disabled="disabled"><label>图片内容：</label><select name="houseType" class="houseType">' + this.select + '</select><img src="'+ this.addHouse +'" class="addHouse"><img class="addHouse" src="'+ this.decrease +'"><br><label>文件上传:</label><input type="file" name="pic" style="display:none" ><br><img src="'+this.addPic+'" onclick="haha(this)" class="shangchuan"><br><span><img src="' + this.star + '">支持jpg / png，图片大小不超过10M</span><div class="button"><input type="button" value="取消" class="addPic" id="cancel"><input type="button" value="确定" class="addPic" id="addPic"></div></form><div></div>';
                        if(document.getElementsByClassName('add')[addNum - 1]) {
                            document.getElementsByClassName('add')[addNum - 1].onclick = () => {
                                $('.pageOne').eq(0).append(form);
                                $('.form').eq(0).find('input')[1].onchange = () => {
                                    $('.form').eq(0).find('img')[2].src = getUrl($('.form').find('input')[1].files[0]);
                                }
                                document.getElementById('addPic').onclick = () => {
                                    this.sub();
                                } 
                                document.getElementById('cancel').onclick = () => {
                                    let mark = document.getElementsByClassName('mark')[0];
                                    mark.parentNode.removeChild(mark);
                                }
                            }
                        }
                        
                    }else {
                        let form = '<div class="mark"><div class="form"><div class="markTitle">上传图片</div><form action=""><label style="display:none">图片类别：</label><input style="display:none"  type="text" name="catePic" value="1" disabled="disabled"><label>图片内容：</label><select name="houseType" class="houseType">' + this.select + '</select><img src="'+ this.addHouse +'" class="addHouse"><img class="addHouse" src="'+ this.decrease +'"><br><label>文件上传:</label><input type="file" name="pic" style="display:none" ><br><img src="'+this.addPic+'" onclick="haha(this)" class="shangchuan"><br><span><img src="' + this.star + '">支持jpg / png，图片大小不超过10M</span><div class="button"><input type="button" value="取消" class="addPic" id="cancel"><input type="button" value="确定" class="addPic" id="addPic"></div></form><div></div>';
                        if(document.getElementsByClassName('add')[addNum - 1]) {
                            document.getElementsByClassName('add')[addNum - 1].onclick = () => {
                                $('.pageOne').eq(0).append(form);
                                $('.form').eq(0).find('input')[1].onchange = () => {
                                    $('.form').eq(0).find('img')[2].src = getUrl($('.form').find('input')[1].files[0]);
                                }
                                document.getElementById('addPic').onclick = () => {
                                    this.sub();
                                }
                                document.getElementById('cancel').onclick = () => {
                                        this.$router.go(0);
                                }
                            }
                        }
                    }       
            },
            sub() {
                if (isNaN($(".houseType option:selected").val()) || $('input')[1].value == "") {
                    alert("不能为空，添加失败!");
                   this.$router.go(0);
                    return false;
                }
                else { 
                    let formdata = new FormData();
                    let options=$(".houseType option:selected");
                    let a = options.val();
                    formdata.append('kind', $('.pageOne').eq(0).find('input')[0].value);
                    formdata.append('placetypeId', a);
                    formdata.append('file', $('.form').find('input')[1].files[0]);
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
                        }
                    }
                    this.$axios.post('/landscape/image', formdata, config).then( (res) => {
                        alert("增加成功");
                        let w = setTimeout(() => {
                            this.$router.go(0);
                        }, 2000);
                    return false; 
                    }).catch((error) =>{
                    });
                }
            },

             //增加公园类型
            addparkType() {
                if (document.getElementsByClassName('addHouse')[0]) {
                    document.getElementsByClassName('addHouse')[0].onclick = () => {
                        let add = '<div class="addHouseType"><div class="houseTitle">增加公园类型<img src="' + this.tankuang + '" id="chaHouse"></div><form action=""><input type="text" maxlength="5" name="house" id="addI" class="housea"><input type="button" value="确定" id="add" ></form></div>';
                        // let add = '<div class="addHouseType"><form action="">增加公园类型：<input type="text" name="house" class="housea"><input type="button" value="确定" id="addPark" class="submit"></form></div>';
                        $('.mark').append(add);
                        document.getElementById('add').onclick = () => {
                            this.addPark();
                        }
                        document.getElementById('chaHouse').onclick = () => {
                            let addHouseType = document.getElementsByClassName('addHouseType')[0];
                            addHouseType.parentNode.removeChild(addHouseType);
                        }
                    }
                }
            },
            getCateHouse() {
                let addHouseType = document.getElementsByClassName('addHouseType')[0];
                addHouseType.parentNode.removeChild(addHouseType);   
                this.$axios.get("/landscape/placetype")
                .then(res => {
                    // console.log(res.data.data);
                    this.parkType = res.data.data;
                    // this.houseType = res.data;
                    this.select = '';
                    for (let a of this.parkType) {
                        this.select += '<option value="'+ a.id +'" >'+ a.name +'</option>';
                        // console.log(this.select);
                        document.getElementsByClassName('houseType')[0].innerHTML = this.select;
                    }  
                })
                .catch(error => {
                console.log(error);
                });          
            },
            addPark() {
                if ($('.housea').val() == "") {
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
                    this.$axios.post('/landscape/placetype',qs.stringify({
                                name: $('.housea').val()
                            }),config).then( (res) => {
                                alert("增加公园类型成功");
                                // this.$router.go(0);
                                this.getCateHouse();
                            }).catch((error) =>{
                                console.log(error);
                            });
                            return false; 
                     }
            },
            //删除公园类型
            decreseparkType() {
                if (document.getElementsByClassName('addHouse')[1]) {
                    document.getElementsByClassName('addHouse')[1].onclick = () => {
                        this.select = '';
                        for (let a of this.parkType) {
                            this.select += '<option value="'+ a.id +'">'+ a.name +'</option>';
                        }
                        let add = '<div class="addHouseType"><div class="houseTitle">减少公园类型<img src="' + this.tankuang + '" id="chaHouse"></div><form action="" ><select name="houseTypeTwo" class="houseTypeTwo">' + this.select + '</select><input type="button" value="确定" id="delete"></form></div>';
                        // let add = '<div class="addHouseType"><form action="" >减少公园类型：<select name="houseTypeTwo" class="houseTypeTwo">' + select + '</select><input type="button" value="确定" id="delete" class="submit"></form></div>';
                        $('.mark').append(add);
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
                        alert("不能为空，添加失败!");
                        // this.$router.go(0);
                        let addHouseType = document.getElementsByClassName('addHouseType')[0];
                        addHouseType.parentNode.removeChild(addHouseType);
                        return false;
                    }
                    else { 
                        let options=$(".houseTypeTwo option:selected");
                        let a = options.val();
                        let config = {
               
                        };
                        this.$axios.delete('/landscape/placetype/'+a)
                            .then( (res) => {
                                alert("减少公园类型成功!");
                                let w = setTimeout(() => {
                                    // this.$router.go(0);
                                    this.getCateHouse();
                                }, 2000);
                             }).catch((error) =>{
                                // console.log();
                        });

                        return false; 
                    }
                }
            },
            addThree() {
                    let addNumTwo =  $('.addTwo').length;
                    let select = '';
                    if (this.parkType) {
                        for (let a of this.parkType) {
                            select += '<option value="'+ a.id +'">'+ a.name +'</option>';
                        }
                        let form = '<div class="mark"><div class="form"><div class="markTitle">上传图片</div><form action=""><label style="display:none">图片类别：</label><input style="display:none"  type="text" name="catePic" value="2" disabled="disabled"><label>图片内容：</label><select name="houseType" class="houseType">' + select + '</select><img src="'+ this.addHouse +'" class="addHouse"><img class="addHouse" src="'+ this.decrease +'"><br><label>文件上传:</label><input type="file" name="pic" style="display:none" ><br><img src="'+this.addPic+'" onclick="haha(this)" class="shangchuan"><br><span><img src="' + this.star + '">支持jpg / png，图片大小不超过10M</span><div class="button"><input type="button" value="取消" class="addPic" id="cancel"><input type="button" value="确定" class="addPic" id="addPic"></div></form><div></div>';
                        if(document.getElementsByClassName('addTwo')[addNumTwo - 1]) {
                            document.getElementsByClassName('addTwo')[addNumTwo - 1].onclick = () => {
                                $('.pageOne').eq(0).append(form);
                                $('.form').eq(0).find('input')[1].onchange = () => {
                                    $('.form').eq(0).find('img')[2].src = getUrl($('.form').find('input')[1].files[0]);
                                }
                                document.getElementById('addPic').onclick = () => {
                                    this.sub();
                                }
                                document.getElementById('cancel').onclick = () => {
                                    let mark = document.getElementsByClassName('mark')[0];
                                    mark.parentNode.removeChild(mark);
                                }
                            }
                        }
                        
                    }else {
                        let form = '<div class="mark"><div class="form"><div class="markTitle">上传图片</div><form action=""><label style="display:none">图片类别：</label><input style="display:none"  type="text" name="catePic" value="2" disabled="disabled"><label>图片内容：</label><select name="houseType" class="houseType">' + select + '</select><img src="'+ this.addHouse +'" class="addHouse"><img class="addHouse" src="'+ this.decrease +'"><br><label>文件上传:</label><input type="file" name="pic" style="display:none" ><br><img src="'+this.addPic+'" onclick="haha(this)" class="shangchuan"><br><span><img src="' + this.star + '">支持jpg / png，图片大小不超过10M</span><div class="button"><input type="button" value="取消" class="addPic" id="cancel"><input type="button" value="确定" class="addPic" id="addPic"></div></form><div></div>';
                        document.getElementsByClassName('addTwo')[addNumTwo - 1].onclick = () => {
                            $('.pageOne').eq(0).append(form);
                            $('.form').eq(0).find('input')[1].onchange = () => {
                                $('.form').eq(0).find('img')[2].src = getUrl($('.form').find('input')[1].files[0]);
                            }
                            document.getElementById('addPic').onclick = () => {
                                this.sub();
                            }
                            document.getElementById('cancel').onclick = () => {
                                this.$router.go(0);
                            }
                        }
                    }
                
            },

            //删除图片
            removeProto() {
                    for (let j = 0; j < $('.add').length - 1; j++) {
                        if($('.chaOne')[j]) {
                            $('.chaOne')[j].onclick = () => {
                                // for (let k = j; k < $('.add').length - 1; k++) {
                                //     $('.add')[k].innerHTML = $('.add')[k + 1].innerHTML;
                                // }
                                // let numOne = $('.add').length;
                                // let protoChild = $('.add')[numOne-1];
                                // protoChild.parentNode.removeChild(protoChild);
                                let result = confirm("确定要删除这张图片吗");
                                if(result) {
                                    const id = this.park.common[j].landscapeTypeImage.image.id;
                                    if (id) {
                                        let config={
                                        

                                        }
                                        this.$axios.delete('/landscape/image/'+id).then((res) => {alert("删除公共设施成功");this.$router.go(0);}).catch(function(err){console.log(err)})
                                    }
                                    
                                }
                            }
                        }
                    }
                
            },
            removeThree() {
                    for (let j = 0; j < $('.addTwo').length - 1; j++) {
                        $('.chaTwo')[j].onclick = () => {
                            // for (let k = j; k < $('.addTwo').length - 1; k++) {
                            //     $('.addTwo')[k].innerHTML = $('.addTwo')[k + 1].innerHTML;
                            // }
                            // let numOne = $('.addTwo').length;
                            // let protoChild = $('.addTwo')[numOne - 1];
                            // protoChild.parentNode.removeChild(protoChild);
                            let result = confirm("确定要删除这张图片吗");
                            if(result) {
                                const id = this.park.park[j].landscapeTypeImage.image.id;
                                if (id) {
                                    let config={
                                      
                                    }
                                    this.$axios.delete('/landscape/image/'+id).then((res) => {alert("删除园林景观成功");this.$router.go(0);}).catch((err) => {console.log(err)})
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
            park() {
                this.addContent();
                let timer = setInterval(() => {
                    this.addThree();
                    this.addProto();
                    this.addparkType();
                    this.decreseparkType();
                    this.removeThree();
                    this.removeProto();
                },100);
            }
        }
    }
</script>

<style lang="scss">
@import "../../styles/main.scss";
@import "../../styles/mixin.scss";

// .submit {
//     margin: px2rem(25) px2rem(300);
// }
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

.addPic {
    float: left;
    margin-left: -100px;
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
            // left: px2rem(20);
            top: px2rem(8);
            cursor: pointer;
            border: 0;
        }
        .button {
            width: 100%;
            height: px2rem(34);
            margin-top: px2rem(20);
            @include fj();
            // background-color: red;
            #cancel {
                margin-left: 0px;
            }
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
            }
            .add:hover {
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
                #cha {
                    visibility: visible;
                }      
                .bottomDiv {
                    visibility: visible;
                }
            }
            .addThree:hover {
                border: px2rem(4) solid red;
                #cha {
                    visibility: visible;
                }
            }
            .addTwo {
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
                    width: px2rem(245);
                    height: px2rem(40);
                    background-color: #3d455a;
                    float: left;
                    margin-left: -160px;
                    margin-top: px2rem(160);
                    opacity: 0.8;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    @include sc(px2rem(16), white);
                    visibility: hidden;
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
        div {
            height: px2rem(40);
            width: px2rem(40);
            border-radius: 50%;
            border: px2rem(2) solid #304156;
            background-color: white;
            font-size: px2rem(50);
            font-weight: 500;
            @include fj(center);
            align-items: center;
        }
        div:hover {
            background-color: #304156;
            color: #fff;
        }
    }
}
</style>
