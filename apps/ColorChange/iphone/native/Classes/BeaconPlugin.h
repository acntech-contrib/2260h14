#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import "BeaconListener.h"

@interface BeaconPlugin : CDVPlugin {
    
}

//This will wrap our Cordova callback with a location
@property BeaconListener *listener;

- (void)range:(CDVInvokedUrlCommand*)command;

@end