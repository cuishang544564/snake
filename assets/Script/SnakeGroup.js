var Snake=cc.Class({
     name:'Snake',
    properties:{
        name:'',
        length:0,
        
        pre:cc.Prefab
    }
});
cc.Class({
    extends: cc.Component,

    properties: {
        snakePre:{
            default:null,
            type: Snake,
            tooltip:'蛇的身体情况'
        },
        startLength:4,
    },
    snakePoolName:function(){
       return this.snakePre.name+'_pool';
    },
    // use this for initialization
    onLoad: function () {
        console.log(G)
        this[this.snakePoolName()] = G.common.createPoll(this.snakePre);
        
        this.snake=G.common.genNewNodesFromPoll(this[this.snakePoolName()],this.snakePre.pre,this.startLength,this.node.parent)

        var coords = G.coordinate;
        let sLength=this.snake.length-1;
        for(let si=0;si<this.snake.length;si++){
            var sc=this.snake[si];

            //sc.corLocation=cc.p(0,sLength)
            sc.changeCor(cc.p(0,sLength));
            sLength--;
        }
        this.direction=cc.KEY.up;
    },
    addSnake:function(){
        console.log(this.snakePoolName())
        let snakeNode=G.common.getNewNodeFromPoll(this[this.snakePoolName()] , this.snakePre.pre ,this.node.parent);
        let lastNode= this.snake[this.snake.length-1];
        let lastV2=lastNode.corLocation;
        snakeNode.changeCor(lastV2);
        this.snake.push(snakeNode);

    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
