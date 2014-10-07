#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import <CoreLocation/CoreLocation.h>

@interface BeaconListener : NSObject <CLLocationManagerDelegate> {
}

@property NSString *callbackID; //Cordova Callback ID
@property id<CDVCommandDelegate> commandDelegate; //Cordova Command Delegate
@property CLLocationManager *locManager; //iBeacon location manager
@property CLBeaconRegion *region; //iBeacon region definition

- (id)initWithCallbackId: (NSString*) callback_id withCommandDelegate: (id<CDVCommandDelegate>) command_delegate forBeaconUUID: (NSUUID *) uuid;
- (void) beginSearchForBeacons;


@end