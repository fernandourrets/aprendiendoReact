
const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;


// Configuration for an Epson network printer
let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: 'tcp://192.168.0.100' // Replace with your printer's actual IP address
  });
  


  // Test the connection and print a message
   const print= async function testPrint(data) {
    try {
      const isConnected = await printer.isPrinterConnected();
      if (isConnected) {
        printer.alignCenter();
        printer.setTypeFontA();
        await printer.printImage('src/public/iconos/lavar.png')
        printer.newLine();
        printer.setTextNormal();
                                           
        //printer.setTextDoubleHeight();                             
        //printer.setTextDoubleWidth();                               
       // printer.setTextQuadArea();                                  
        //printer.setTextSize(1,1);                                   
        printer.println("LAVADERO SPILIMBERGO");
        printer.newLine();
        printer.println("!!! Paga desde tu celular !!!");
        printer.newLine();
        //printer.code128("Code128");     --imprime codigo de barras                            
        printer.printQR("QR Code", {
          cellSize: 6,             // 1 - 8
          correction: 'M',         // L(7%), M(15%), Q(25%), H(30%)
          model: 2,                // 1 - Model 1
                                   // 2 - Model 2 (standard)
                                   // 3 - Micro QR
      });
        printer.newLine();
        printer.println("Escanea el QR y obtene 10% descuento");
        printer.drawLine();
        printer.newLine();
       
        printer.println(data);
        
        printer.cut();
        await printer.execute();
        console.log("Print done!");
      } else {
        console.error("Printer is not connected.");
      }
    } catch (error) {
      console.error("Print failed:", error);
    }
  }
  
 
module.exports=print
