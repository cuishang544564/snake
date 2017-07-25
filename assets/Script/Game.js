var SnakeGroup=require("SnakeGroup");
var Fruit=require("Fruit");
cc.Class({
    extends: cc.Component,

    properties: {
         snakeGroup:{
            default:null,
            type: SnakeGroup
        },
        fruit:{
            default:null,
            type: Fruit
        },
        speedSecond:0,
        score:cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        //this.score.string=0;
        
        G.coordinate=this.getCoordinate();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.loadSnakeGroup();
        console.log("sch:"+this.schedule);
        this.schedule(function() {
            

            this.fruit.createFruit();
            
        }, 0.1);
    },
    loadSnakeGroup:function(){
        this.schedule(this.moveByScheduler, this.speedSecond);
    },
    removeSnakeGroupSch:function(){
        this.unschedule(this.moveByScheduler);
    },
    onKeyDown:function(event){
        this.moveByKeyBord(event.keyCode);
    },
    moveByScheduler:function(){
        let keyCode=this.snakeGroup.direction
        let snake=this.snakeGroup.snake;
        
        var sc=snake[0];
       

        var v2=null;

        switch(keyCode) {
            case cc.KEY.up:
                    
                    

                    v2=cc.p(sc.corLocation.x,sc.corLocation.y+1);
                
                break;
            case cc.KEY.down:
                
                    

                    v2=cc.p(sc.corLocation.x,sc.corLocation.y-1);
                
                break;
            case cc.KEY.left:
                

                    v2=cc.p(sc.corLocation.x-1,sc.corLocation.y);
                break;
            case cc.KEY.right:
                v2=cc.p(sc.corLocation.x+1,sc.corLocation.y);
                break;
        }
        
        
        if(v2.x>G.coordinate.length-1||v2.x<0||v2.y>G.coordinate[0].length-1||v2.y<0){
                    return;
        }else{
            for(let si=snake.length-1;si>0;si--){
                let scc=snake[si];
                scc.changeCor(snake[si-1].corLocation)
            }
             sc.changeCor(v2);
        }
    },
    moveByKeyBord:function(keyCode){
        let direction=this.snakeGroup.direction;
        if(direction==keyCode){
            return;
        }
        //this.moveByScheduler(keyCode);
        
        this.snakeGroup.direction=keyCode;
    },
    
    getCoordinate:function(){
        let superNode=this.node.parent;
        let size=superNode.getContentSize();
        let y=size.height;
        let x=size.width;

        let yLength=y/20;
        let xLength=x/20;

        let xMin=-(x/2);
        

        
        let coords=new Array();
        for(let xi=0;xi<xLength;xi++){
            let yMin=-(y/2);
            coords[xi]=new Array();
            if(xi==0){
                xMin+=10;
            }else{
                xMin+=20;
            }
            
            for(let yi=0;yi<yLength;yi++){
                if(yi==0){
                    yMin+=10;
                }else{
                    yMin+=20;
                }
                
                coords[xi][yi]=cc.p(xMin,yMin);
            }
        }

        return coords;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
