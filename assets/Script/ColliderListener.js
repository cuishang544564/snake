var Fruit=require("Fruit");
var Game=require("Game");
var SnakeGroup=require("SnakeGroup")
const FRUIT="fruit";
const SNAKE="snake";
cc.Class({
    extends: cc.Component,

    properties: {
        type:""
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        
        this.touchingNumber = 0;
    },
    
    onCollisionEnter: function (other) {
        this.node.color = cc.Color.RED;
        
        var parent=this.node.parent;
        var nodeName=this.node.name;
        
        var fruit=other.node;
        switch(nodeName){
            case SNAKE:
                if(fruit.getComponent("ColliderListener").type==FRUIT){
                    
                    this.node.parent.getComponentInChildren(Fruit).isHave=false;
                    let gameCompent=this.node.parent.getComponentInChildren(Game);
                    let score=gameCompent.score;
                    //加速
                    gameCompent.speedSecond=gameCompent.speedSecond-gameCompent.speedSecond*0.1;
                    gameCompent.removeSnakeGroupSch();
                    gameCompent.loadSnakeGroup();
                    this.node.parent.getComponentInChildren(SnakeGroup).addSnake();
                    let scorenum=parseInt(score.string)+fruit.score;
                    score.string=scorenum;
                    fruit.removeFromParent();
                }
            break;
            
        }
        this.touchingNumber ++;
        
    },
    destoryEnemy:function(){
        this.node.getComponent(Enemy).destroyEnemy(this.node);
    },
    onCollisionStay: function (other) {
        // console.log('on collision stay');
    },
    
    onCollisionExit: function () {
        this.touchingNumber --;
        
            this.node.color = cc.Color.WHITE;
        
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
