ppsGroup={"GP1":{"functions":["INT4","INT0","T1CK","T5CK","IC4","U1TX","U2RTS","U3RX","SDI1","SDO2","SDO1","C1TX","ECOL","ETXCLK","REFI","REFO1","OCFD","PTGP28","OC1"]},
 "GP2":{"functions":["INT3","T2CK","T6CK","IC3","U1CTS","U2RX","U3TX","SDO1","SDI2","SDO2","C2TX","ETXERR","ERXD3","REFO2","OCFC","PTGP29","OC2"]},
 "GP3":{"functions":["INT2","T3CK","T7CK","IC1","U1RX","U2CTS","U3RTS","CS1","C1RX","ECRS","ETXD3","ERXD2","REFO3","OCFB","PTGP30","OC3"]},
 "GP4":{"functions":["INT1","T4CK","IC2","U1RTS","U2TX","U3CTS","CS2","C2RX","ETXD2","REFO4","OCFA","PTGP31","OC4"]}}

pads=[{"port":"RA1","group":"GP2","functions":["HSSS1"]},
{"port":"RC7","group":"GP4","functions":["HSSDI1"]},
{"port":"RC8","group":"GP4","functions":["HSSDO1"]},
{"port":"RC6","group":"GP3", "functions":["HSSCK1"]},
{"port":"RC13","group":"GP1", "functions":["ETXEN"]},
{"port":"RC10","group":"GP2", "functions":["ERXD1"]},
{"port":"RC11","group":"GP3", "functions":["ERXD0"]},
{"port":"RC9","group":"GP1", "functions":["ERXERR"]},
{"port":"RK14","group":"GP3", "functions":["EMDC"]},
{"port":"RC15","group":"GP3", "functions":["ETXD0"]},
{"port":"RK12","group":"GP1", "functions":["ERXDV"]},
{"port":"RC12","group":"GP4", "functions":["ERXCLK", "ETH_CLK_OUT"]},
{"port":"RC14","group":"GP2", "functions":["ETXD1"]},
{"port":"RK13","group":"GP2", "functions":["EMDIO"]},
{"port":"RA4","group":"GP1", "functions":["SCL1"]},
{"port":"RA5","group":"GP2", "functions":["SDA1"]},
{"port":"RB2","group":"GP3", "functions":["USBID", "AN2", "PGD1 "]},
{"port":"RB1","group":"GP4", "functions":["ETH_EXCLK_OUT", "VBUSON"]},
{"port":"RA9","functions":["HSU1TX"]},
{"port":"RA0","group":"GP1","functions":["HSU1RX", "SQICS0"]},
{"port":"RA6","functions":["HSU1CTS"]},
{"port":"RA7","functions":["HSU1RTS"]},
{"port":"RB9","group":"GP2", "functions":["PGD4", "TDI"]},
{"port":"RB8","group":"GP1", "functions":["PGC4", "TCK"]},
{"port":"RB7","group":"GP4", "functions":["TDO"]},
{"port":"RB6","group":"GP3", "functions":["TMS"]},
{"port":"RA14","group":"GP3", "functions":[]} ,
{"port":"RB12","group":"GP1", "functions":[]},
{"port":"RB5","group":"GP2", "functions":["PGD2"]},
{"port":"RB4","group":"GP1", "functions":["PGC2"]},
{"port":"RK5","group":"GP2", "functions":["PTA_WLAN_ACTIVE"]},
{"port":"RK6","group":"GP3", "functions":["PTA_BT_PRIO"]},
{"port":"RK7","group":"GP4", "functions":["PTA_BT_ACTIVE"]},
{"port":"RK4","group":"GP1", "functions":["BT_CLK_OUT"]}]

peripherals={"ETH":{"functions":["ETXEN","ERXD1","ERXD0","ERXERR","EMDC","ETXD0","ERXDV","ERXCLK","ETXD1","EMDIO"]},
"HSUART": {"functions":["HSU1TX", "HSU1RX"]},
"UART1" : {"functions":["U1TX", "U1RX"]},
"UART2" : {"functions":["U2TX", "U2RX"]},
"UART3" : {"functions":["U3TX", "U3RX"]},
"HSSPI" : {"functions":["HSSCK1","HSSDI1","HSSDO1","HSSS1"]},
"SPI1"  : {"functions":["SCK1","SDI1","SDO1","CS1"]},
"SPI2"  : {"functions":["SCK2","SDI2","SDO2","CS2"]},
"I2C1"  : {"functions":["SCL1","SDA1"]},
"I2C2"  : {"functions":["SCL2","SDA2"]},
"ICSP1" : {"functions":["PGC1","PGD1"]},
"ICSP2" : {"functions":["PGC2","PGD2"]},
"ICSP3" : {"functions":["PGC3","PGD3"]},
"ICSP4" : {"functions":["PGC4","PGD4"]},
"JTAG"  : {"functions":["TDI","TDO","TCK","TMS"]},
"PTA"   : {"functions":["PTA_WLAN_ACTIVE","PTA_BT_PRIO","PTA_BT_ACTIVE","BT_CLK_OUT"]}}


/*Append groups and non-PPS functions*/
for(i in pads){
	if(pads[i].hasOwnProperty("group")){
		pads[i].functions=pads[i].functions.concat(ppsGroup[pads[i].group].functions)
	}
}


//function find_pads(peripheralName){
//	var retVar={};
//	var padList=[];
//	if(peripherals.hasOwnProperty(peripheralName)){
//		for (k=0;k<peripherals[peripheralName].functions.length;k++){
//			//console.log(peripherals[peripheralName].functions[k] + " : ")
//			for ( i in pads){
//				for ( j=0;j< pads[i].functions.length;j++){
//					if ( peripherals[peripheralName].functions[k]== pads[i].functions[j]){
//						//console.log(pads[i].port)
//						padList.push((pads[i].port))
//					}
//				}
//			}
//			retVar[peripherals[peripheralName].functions[k]]=padList
//			padList=[]
//			//console.log("\n");
//		}
//	}
//	return(retVar);
//}


function find_pads(){
	var retVar={};
	var padList=[];
	
	if(arguments.length>0){
	for (argIndex=0;argIndex<arguments.length;argIndex++){
	peripheralName=arguments[argIndex];
	if(peripherals.hasOwnProperty(peripheralName)){
		retVar[peripheralName]=[];
		for (k=0;k<peripherals[peripheralName].functions.length;k++){
			//console.log(peripherals[peripheralName].functions[k] + " : ")
			for ( i in pads){
				for ( j=0;j< pads[i].functions.length;j++){
					if ( peripherals[peripheralName].functions[k]== pads[i].functions[j]){
						//console.log(pads[i].port)
						padList.push((pads[i].port))
					}
				}
			}
			retVar[peripheralName][peripherals[peripheralName].functions[k]]=padList
			padList=[]
			//console.log("\n");
		}
	}
	}
	}
	return(retVar);
}



function cleanup_dedicated(padsList){
	var nonPPSList=[];
	
	for ( peripheral in padsList){
		for (functions in padsList[peripheral]){
			for (pins in padsList[peripheral][functions]){
				if(1==padsList[peripheral][functions].length){
					nonPPSList.push(padsList[peripheral][functions])
				}	
			}
		}
	}
	
//	for (i in nonPPSList){
//		console.log(nonPPSList[i]);
//	}


	for ( peripheral in padsList){
		for (functions in padsList[peripheral]){
			for (pins in padsList[peripheral][functions]){
				if(1==padsList[peripheral][functions].length){
					 //delete here
					//nonPPSList.push(padsList[peripheral][functions])
				}
				//splice here
			}
		}
	}

	
}

x=find_pads_multi("ETH","UART1")
cleanup_dedicated(x)
