/*:
 * @plugindesc Version: 1.01 | Epic warning sign for boss battles.
 * @author William Ramsey (TheUnproPro)
 *
 * @param Sound
 * @desc Which sound is played when the warning message shows up?
 * @default Siren
 *
 * @param Volume
 * @desc Volume of the sound played
 * @default 70
 *
 * @param Pitch
 * @desc Pitch of the sound played
 * @default 100
 *
 * @param Timer
 * @desc How long does it stay on screen?
 * @default 240
 *
 * @param Message
 * @desc What message appears?
 * @default Warning!
 *
 * @param Message 2
 * @desc Small message that appears
 * @default 
 *
 * @param Message Color
 * @desc What color is the message?
 * @default 255, 0, 0, 1
 *
 * @param Back Color 1
 * @desc What color is behind the message?
 * @default 150, 50, 0, 0.5
 *
 * @param Back Color 2
 * @desc What color is behind the smaller message?
 * @default 0, 0, 0, 0.5
 *
 * @param Line Color 1
 * @desc What color is the line in front?
 * @default 255, 255, 0, 0.5
 *
 * @param Line Color 2
 * @desc What color is the line drawn in the back?
 * @default 150, 50, 0, 0.5
 *
 * @help
 * This plugin is really easy to use! You can change its colors and what
 * message is displayed using the following plugin commands.
 *
 * upp_setWarningMsg - Sets the large text
 * upp_setWarningSubMsg - Sets the small text
 * upp_setWarningTime - Sets how long it stays active.
 * upp_setWarningBackColor1 - Sets the bg color for large text
 * upp_setWarningBackColor2 - Sets the bg color for small text
 * upp_setWarningLineColor1 - Sets the color of the line that moves
 * upp_setWarningLineColor2 - Sets the color of the line drawn behind
 *                            the animated one.
 * upp_displayWarning - Displays the warning message.
 * 
 */
 
(function() {
	var params = PluginManager.parameters("upp_bossWarning");
	
	var warningSe = {
		name: params['Sound'],
		volume: Number(params['Volume']),
		pitch: Number(params['Pitch']),
		pan: 0
	}
	
	var uppWarningOn = false;
	var warningTimer = Number(params['Timer']);
	var warningMsg = params['Message'];
	var warningMsg2 = params['Message 2'];
	var warningColor = "rgba("+params['Message Color']+")";
	var backColor = "rgba("+params['Back Color 1']+")";
	var backColor2 = "rgba("+params['Back Color 2']+")";
	var lineColor1 = "rgba("+params['Line Color 1']+")";
	var lineColor2 = "rgba("+params['Line Color 2']+")";
	
	var upp_miniMapCmds = Game_Interpreter.prototype.pluginCommand
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		upp_miniMapCmds.apply(this, arguments);

		if(command == "upp_setWarningMsg"){
			warningMsg="";
			var len = args.length;
			console.log(len);
			for(var i=0;i<len;i++) {
				warningMsg += args[i];
				if(i<args.length-1) {
					warningMsg += " ";
				}
			}
		}
		
		if(command == "upp_setWarningSubMsg"){
			warningMsg2="";
			var len = args.length;
			console.log(len);
			for(var i=0;i<len;i++) {
				warningMsg2 += args[i];
				if(i<args.length-1) {
					warningMsg2 += " ";
				}
			}
		}
		
		if(command == "upp_setWarningColor"){
			warningColor = "rgba("+args[0]+"," +args[1]+","+args[2]+","+args[3]+")"
		}
		
		if(command == "upp_setWarningBackColor1"){
			backColor = "rgba("+args[0]+"," +args[1]+","+args[2]+","+args[3]+")"
		}
		
		if(command == "upp_setWarningBackColor2"){
			backColor2 = "rgba("+args[0]+"," +args[1]+","+args[2]+","+args[3]+")"
		}
		
		if(command == "upp_setWarningLineColor1"){
			lineColor1 = "rgba("+args[0]+"," +args[1]+","+args[2]+","+args[3]+")"
		}
		
		if(command == "upp_setWarningLineColor2"){
			lineColor2 = "rgba("+args[0]+"," +args[1]+","+args[2]+","+args[3]+")"
		}
		
		if(command == "upp_setWarningTime"){
			warningTimer = Number(args[0]);
		}
		
		if(command == "upp_displayWarning"){
			uppWarningOn = true;
		}
		
	}
	
	function Window_UppWarning() {
		this.initialize.apply(this, arguments);
	}
	
	Window_UppWarning.prototype = Object.create(Window_Base.prototype);
	Window_UppWarning.prototype.constructor = Window_UppWarning;
	
	Window_UppWarning.prototype.initialize = function() {
		Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
		this.dfSize = this.contents.fontSize;
		this.refresh();
		this.sin = [];
		this.i=0;
		this.j=0;
		this.count=0;
		this.opacity=0;
		this.warning = -15;
		this.timer=0;
		this.msg = warningMsg;
		this.msg2="";
		this.msg3 = warningMsg2;
		this.msg4="";
		this.xloc=0;
	}
	
	Window_UppWarning.prototype.standardPadding = function() {
		return 0;
	}
	
	Window_UppWarning.prototype.refresh = function() {
		console.log(uppWarningOn);
		if(uppWarningOn==true) {
			this.msg = warningMsg;
			this.msg3 = warningMsg2;
			this.contents.clear();
			this.contents.fontSize = 128;
			while (this.i<this.msg.length)
			{
				this.count+=1;
				if(this.count==10) {
					this.msg2+=this.msg[this.i];
					this.i+=1;
					this.count=0;
				}
				break;
			}
			if(this.warning==0 && this.timer<warningTimer) {
				AudioManager.playSe(warningSe);
			}
			this.warning+=1;
			this.warning=(this.warning>=60) ? 0:this.warning;
			this.timer+=1;
			this.contents.fillRect(0, this.contents.height/2-this.contents.fontSize*1.5+4, this.contents.width, this.contents.fontSize*1.5+4, backColor);
			
			this.contents.fillRect(0, this.contents.height/2-this.contents.fontSize*1.5+4, this.contents.width, 12, lineColor2);
			this.contents.fillRect(0, this.contents.height/2-4, this.contents.width, 12, lineColor2);
			
			this.contents.fillRect(-this.timer, this.contents.height/2-this.contents.fontSize*1.5+4, this.contents.width, 12, lineColor1);
			this.contents.fillRect(this.timer, this.contents.height/2-4, this.contents.width, 12, lineColor1);
			this.changeTextColor(warningColor);
			this.contents.drawText(this.msg2, this.xloc+this.contents.width/2-(32*this.msg.length), -96, this.contents.width, this.contents.height);
			this.contents.fontSize=this.dfSize;
			this.contents.fillRect(0, this.contents.height/2+8, this.contents.width, this.lineHeight(), backColor2);
			this.contents.fillRect(0, this.contents.height/2+(this.lineHeight()+8), this.contents.width, 2, lineColor1);
			while(this.j<this.msg3.length)
			{
				this.msg4+=this.msg3[this.j];
				this.j+=1;
				break;
			}
			this.contents.drawText(this.msg4, -this.xloc, 24, this.contents.width, this.contents.height, 'center');
			if(this.timer>warningTimer) {
				this.xloc+=5;
				this.alpha-=(1/30);
			}
			if(this.timer==warningTimer+30) {
				uppWarningOn = false;
				this.timer=0;
				this.i=0;
				this.j=0;
				this.count=0;
				this.msg2="";
				this.msg4="";
				this.contents.clear();
				this.alpha=1;
				this.xloc=0;
				
			}
		}
	}
	
	Window_UppWarning.prototype.update = function() {
		this.refresh();
	}
	
	var smcaw = Scene_Map.prototype.createAllWindows
	Scene_Map.prototype.createAllWindows = function() {
		smcaw.call(this);
		this.t = new Window_UppWarning();
		this.addChild(this.t);
	}
})();