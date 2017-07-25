var FruitPre=cc.Class({
     name:'FruitPre',
    properties:{
        name:'',
        length:0,
        score:0,
        pre:cc.Prefab
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
        fruitPre:{
            default:null,
            type: FruitPre,
            tooltip:'蛇的身体情况'
        },
    },
    fruitPoolName:function(){
       return this.fruitPre.name+'_pool';
    },
    // use this for initialization
    onLoad: function () {
        this.fruits=G.common.createPoll(this.fruitPre);
        
    },
    createFruit:function(){
        

        if(this.isHave){
            return;
        }
        let newNode = null;
        let pool=this.fruits;
        if (pool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            newNode = pool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            newNode = cc.instantiate(this.fruitPre.pre);
        }
        var xLength=G.coordinate.length;
        var yLength=G.coordinate[0].length;

        let x=G.common.rnd(0,xLength-1);
        let y=G.common.rnd(0,yLength-1);
       
        newNode.group='fruit';
        newNode.score=this.fruitPre.score;
        newNode.setPosition(G.coordinate[x][y]);

        newNode.parent=this.node.parent;
        this.playNode=newNode;
        this.isHave=true;
        return newNode;
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
