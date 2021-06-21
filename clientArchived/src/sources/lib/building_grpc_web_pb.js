/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var summary_pb = require('./summary_pb.js')

var zoning_lot_pb = require('./zoning_lot_pb.js')

var zoning_common_pb = require('./zoning_common_pb.js')
const proto = require('./building_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.BuildingServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.BuildingServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.MakeBuildingRequest,
 *   !proto.ProposedBuilding>}
 */
const methodDescriptor_BuildingService_MakeBuilding = new grpc.web.MethodDescriptor(
  '/BuildingService/MakeBuilding',
  grpc.web.MethodType.UNARY,
  proto.MakeBuildingRequest,
  proto.ProposedBuilding,
  /**
   * @param {!proto.MakeBuildingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ProposedBuilding.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.MakeBuildingRequest,
 *   !proto.ProposedBuilding>}
 */
const methodInfo_BuildingService_MakeBuilding = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ProposedBuilding,
  /**
   * @param {!proto.MakeBuildingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ProposedBuilding.deserializeBinary
);


/**
 * @param {!proto.MakeBuildingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ProposedBuilding)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ProposedBuilding>|undefined}
 *     The XHR Node Readable Stream
 */
proto.BuildingServiceClient.prototype.makeBuilding =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/BuildingService/MakeBuilding',
      request,
      metadata || {},
      methodDescriptor_BuildingService_MakeBuilding,
      callback);
};


/**
 * @param {!proto.MakeBuildingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ProposedBuilding>}
 *     Promise that resolves to the response
 */
proto.BuildingServicePromiseClient.prototype.makeBuilding =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/BuildingService/MakeBuilding',
      request,
      metadata || {},
      methodDescriptor_BuildingService_MakeBuilding);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.BuildingSummaryServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.BuildingSummaryServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ProposedBuilding,
 *   !proto.BuildingSummary>}
 */
const methodDescriptor_BuildingSummaryService_GetBuildingTable = new grpc.web.MethodDescriptor(
  '/BuildingSummaryService/GetBuildingTable',
  grpc.web.MethodType.UNARY,
  proto.ProposedBuilding,
  summary_pb.BuildingSummary,
  /**
   * @param {!proto.ProposedBuilding} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  summary_pb.BuildingSummary.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ProposedBuilding,
 *   !proto.BuildingSummary>}
 */
const methodInfo_BuildingSummaryService_GetBuildingTable = new grpc.web.AbstractClientBase.MethodInfo(
  summary_pb.BuildingSummary,
  /**
   * @param {!proto.ProposedBuilding} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  summary_pb.BuildingSummary.deserializeBinary
);


/**
 * @param {!proto.ProposedBuilding} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.BuildingSummary)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.BuildingSummary>|undefined}
 *     The XHR Node Readable Stream
 */
proto.BuildingSummaryServiceClient.prototype.getBuildingTable =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/BuildingSummaryService/GetBuildingTable',
      request,
      metadata || {},
      methodDescriptor_BuildingSummaryService_GetBuildingTable,
      callback);
};


/**
 * @param {!proto.ProposedBuilding} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.BuildingSummary>}
 *     Promise that resolves to the response
 */
proto.BuildingSummaryServicePromiseClient.prototype.getBuildingTable =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/BuildingSummaryService/GetBuildingTable',
      request,
      metadata || {},
      methodDescriptor_BuildingSummaryService_GetBuildingTable);
};


module.exports = proto;

