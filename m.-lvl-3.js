var death = 0;
var thirdLevel = {
    preload: function(){
        game.load.image('player', 'media/220px-Timon_(The_Lion_King).png')
        game.load.image('wall', 'media/blocks.png')
        game.load.image('coin', 'media/gold_nugget.png')
        game.load.image('enemy', 'media/legolus.png') 
        game.load.image('background', 'media/background.png')
        game.load.image('wall2', 'media/wall.png')
        game.load.image('flagpole', 'media/pixil-frame-0.png')
    },
    
    create: function(){
        this.isCrouching = false
        //set the game's background color
        game.add.tileSprite(0,0,852,480,'background');
        
        var text = game.add.text(0,0,death, 
            {
                fill:'black'
        });
        //start the arcade physics (for movement and collision)
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //add the physics engine to all objects
        game.world.enableBody = true;
        
        this.cursor = game.input.keyboard.createCursorKeys();
        
        //creates the player in the middle of the game
        this.player = game.add.sprite(70, 150, 'player');
        this.score = 0;
        
        //sets the grevity of the player
        this.player.body.gravity.y = 600;
        
        //creates 3 groups that will contain objects
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.enemies = game.add.group();
        this.walls2 = game.add.group();
        
        this.danger = game.add.sprite(30,95,"enemy");
        this.enemies.add(this.danger)
        this.tween = game.add.tween(this.danger).to({x:400,y:95},1000,"Linear",true,0,-1)
        this.tween.yoyo(true,0)
        
        var level = [
            '                                        ',
            '                                        ',            
            '                                        ',            
            '                                        ',           
            '                                        ',            
            '                                        ',            
            '                                        ',            
            '                                 z      ',            
            '                       o                ',            
            '            o                           ',             
            '               !    x        xxxx  o    ',           
            '                                        ',             
            '                                        ',
            '                    xxxx      o         ',
            '      xxxx                              ',             
            '                                        ',           
            '    !!!             !                   ',             
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            
        ]
        
        for(var i = 0; i < level.length; i++){
            for(var j = 0; j <level[0].length; j++){
                
                if(level[i][j] === 'x'){
                    var wall = game.add.sprite(30+20*j, 30+20*i, 'wall');
                    this.walls.add(wall);
                    wall.body.immovable = true;
                    
                }else if(level[i][j] === '!'){
                    var enemy = game.add.sprite(30+20*j, 30+20*i, 'enemy');
                    this.enemies.add(enemy);
                    
                }else if(level[i][j] === 'o'){
                    var coin = game.add.sprite(30+20*j, 30+20*i, 'coin');
                    this.coins.add(coin);
                        
                }else if(level[i][j] === 'e'){
                    var wall2 = game.add.sprite(30+20*j, 30+20*i, 'wall2');
                    this.walls2.add(wall2); 
                
                }else if(level[i][j] === 'z'){
                    this.flagpole = game.add.sprite(30+20*j, 30+20*i, 'flagpole');
                    this.flagpole.scale.setTo(2,3);
                 }
            }
        }
        
        
    
    
    },
    
    update: function (){
        //check for player and walls colliding
        game.physics.arcade.collide(this.player, this.walls);
    
        //check for player and coins overlapping
        game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);
        
        //check for player and enemy overlapping
        game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
        
        //check for player and wall2 overlapping
        game.physics.arcade.overlap(this.player, this.wall2, this.takeWall2, null, this);
        if(this.score >= 4){
         game.state.start('fourth');
        }
        if(this.cursor.left.isDown){
           this.player.body.velocity.x = -200;
        }else if(this.cursor.right.isDown){
           this.player.body.velocity.x = 200;
        }else{
           this.player.body.velocity.x = 0; 
        }
        
        if(this.cursor.up.isDown && this.player.body.touching.down){
           this.player.body.velocity.y = -200;
        }else if(this.cursor.down.isDown){
            this.player.height = 10
            this.isCrouching = true
        }else if(this.cursor.down.isUp && this.isCrouching){
            this.isCrouching = false
            this.player.body.y -= 25
            this.player.height = 25
        }
    },
    
    takeCoin: function(player, coin){
        this.score++;
        coin.kill();
    },
    
    
    restart: function(){
        death++;
        game.state.start('third')
    }
    
}
