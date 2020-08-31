// MFSU
var block_MFSU = IDRegistry.genBlockID(fz("MFSU"));
Block.createBlock(fz("MFSU"),[
	{name:"MFSU",texture:[["mfsu_side",0],["mfsu_front",0],["mfsu_side",0],["mfsu_side",0],["mfsu_side",0],["mfsu_side",0]],inCreative:true}
]);
ToolAPI.registerBlockMaterial(fz("MFSU"),"wood");

Item.addCreativeGroup("storage",Translation.translate("Storage"),[block_MFSU]);

var GuiMFSU = new UI.StandartWindow({
	standart:{
		header:{text:{text:Translation.translate("MFSU")}},
		inventory:{standart:true},
		background:{standart:true}
	},
	
	drawing:[{type:"bitmap",x:360,y:50,bitmap:"energy_bar_background",scale:GUI_SCALE}],
	
	elements:{
		"slotEnergyOutput":{type:"slot",x:560,y:180,isValid:function(id,count,data,container){
			return ChargeItemRegistry.isValidItem(id,"Eu",container.tileEntity.getTier());
		}},

		"scaleEnergy":{type:"scale",x:360+GUI_SCALE*3,y:50+GUI_SCALE*3,value:0.5,bitmap:"energy_bar_scale",scale:GUI_SCALE},
		"textStorage":{type:"text",font:{color:Color.BLACK},x:450,y:65,width:300,height:30,text:"0/0 Eu"}
	}
});

Machine.registerStorage(block_MFSU,{
	canReceiveEnergy:function(side){
		return side == BlockSide.UP;
	},
	
	canExtractEnergy:function(side){
		return side != BlockSide.UP;
	},

	getEnergyStorage:function(){
		return 600000;
	},

	getGuiScreen:function(){
		return GuiMFSU;
	},

    getTier:function(){
        return 3;
    },

	tick:function(){
		this.data.energy -= ChargeItemRegistry.addEnergyTo(this.container.getSlot("slotEnergyOutput"),"Eu",this.data.energy,this.getTier());

		this.container.setScale("scaleEnergy",this.data.energy / this.getEnergyStorage());
		this.container.setText("textStorage",this.data.energy + "/" + this.getEnergyStorage() + " Eu");
	}
});