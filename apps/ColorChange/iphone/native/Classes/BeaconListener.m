#import "BeaconListener.h"
#import <Cordova/CDV.h>

@implementation BeaconListener


//Initialize the BeaconListener with neccessary callback information
- (id)initWithCallbackId: (NSString*) callback_id withCommandDelegate: (id<CDVCommandDelegate>) command_delegate forBeaconUUID: (NSUUID *) uuid{
    self = [super init];
    self.callbackID = callback_id;
    self.commandDelegate = command_delegate;
    self.locManager = [[CLLocationManager alloc] init];
    self.locManager.delegate = self;
    
    
    self.region = [[CLBeaconRegion alloc] initWithProximityUUID: uuid identifier: @""];
    return self;
}

- (void) beginSearchForBeacons {
    [self.locManager startRangingBeaconsInRegion: self.region];
}


//Callback from CLLocationManagerDelegate protocol letting us know
//that a range result is available
- (void)locationManager:(CLLocationManager *)manager
        didRangeBeacons:(NSArray *)beacons
               inRegion:(CLBeaconRegion *)region {
    
    [manager stopRangingBeaconsInRegion:region];
    
    //Build an NSArray containing dictionaries. Each dictionary contains
    //information about a beacon. This is passed back to javascript as
    //an parameter of the callback
    NSMutableArray *results = [[NSMutableArray alloc] init];
    for(int i = 0; i < [beacons count]; i++) {
        CLBeacon *beacon = beacons[i];
        NSDictionary * beaconDict = @{@"major": [beacon major],
                                      @"minor": [beacon minor],
                                      @"rssi": [[NSString alloc] initWithFormat:@"%d",[beacon rssi] ]};
        
        [results addObject:beaconDict];
        
    }
    
    //Everything went OK, so return the result to javascript via the callback
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsArray:results];
    [self.commandDelegate sendPluginResult:pluginResult callbackId: self.callbackID];
    
}


@end