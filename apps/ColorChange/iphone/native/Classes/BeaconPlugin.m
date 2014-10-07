#import "BeaconPlugin.h"
#import "BeaconListener.h"

@implementation BeaconPlugin : CDVPlugin

//Implement the 'range' method of the Cordova plugin
- (void) range: (CDVInvokedUrlCommand*)command {
    NSString * uuidString = [command.arguments objectAtIndex:0];
    
    //Check to make sure the user sent a UUID string as a parameter to cordova.exec
    if(uuidString == nil) {
        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_ERROR messageAsString: @"Missing UUID!"];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        return;
        
    }
    
    //Create a NSUUID object from a NSString uuid passed as a parameter.
    NSUUID * uuid = [[NSUUID alloc] initWithUUIDString:uuidString];
    
    //Create a Beacon Listener, and start the ranging process
    self.listener = [[BeaconListener alloc] initWithCallbackId:command.callbackId withCommandDelegate:self.commandDelegate forBeaconUUID:uuid];
    [self.listener beginSearchForBeacons];
}

@end