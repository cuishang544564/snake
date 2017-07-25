// declare global variable "D"

var gameState = cc.Enum({
    none: 0,
    start: 1,
    stop: 2,
});

var common = cc.Class({
    
    extends: cc.Component,

    properties: {
        
    },
    statics: {
        gameState
    },
    // use this for initialization
    onLoad: function () {
        G.commonInfo = common;
        G.common = this;
    },
    
    createPoll:function(obj){

        var pool=new cc.NodePool();
        let length=obj.length;
        for(let oi=0;oi<length;oi++){
            let node=cc.instantiate(obj.pre);
            pool.put(node);
        }
        return pool;
    },
    genNewNodesFromPoll: function(pool,prefab,length,parent){
        let nodeArray=new Array();
        for(let ni=0;ni<length;ni++){
            let newNode = this.getNewNodeFromPoll(pool,prefab,parent);
            
            nodeArray.push(newNode);

        }
        
        return nodeArray;
    },
    getNewNodeFromPoll: function(pool,prefab,parent){

        let newNode = null;
        if (pool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            newNode = pool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            newNode = cc.instantiate(prefab);
        }
        newNode.group='snake';
        newNode.parent=parent;
        newNode.x=0;
        newNode.y=0;
        newNode.changeCor=function(v2){
                
                this.setPosition(G.coordinate[v2.x][v2.y])
                this.corLocation=v2;
        }
        return newNode;
    },
   
    //放回对象池
    backObjPool: function(thisO,nodeinfo){
        var poolName = nodeinfo.name + 'Pool';
        thisO[poolName].put(nodeinfo); 
    },
    rnd: function(n, m){
        var random = Math.floor(Math.random()*(m-n+1)+n);
        return random;
    }
    
});
