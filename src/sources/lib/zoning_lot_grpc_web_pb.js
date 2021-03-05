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


var scenario_pb = require('./scenario_pb.js')

var site_pb = require('./site_pb.js')

var zoning_common_pb = require('./zoning_common_pb.js')
const proto = require('./zoning_lot_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.ZoningLotServiceClient =
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
proto.ZoningLotServicePromiseClient =
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
 *   !proto.MakeZoningLotRequest,
 *   !proto.ZoningLot>}
 */
const methodDescriptor_ZoningLotService_MakeZoningLot = new grpc.web.MethodDescriptor(
  '/ZoningLotService/MakeZoningLot',
  grpc.web.MethodType.UNARY,
  proto.MakeZoningLotRequest,
  proto.ZoningLot,
  /**
   * @param {!proto.MakeZoningLotRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ZoningLot.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.MakeZoningLotRequest,
 *   !proto.ZoningLot>}
 */
const methodInfo_ZoningLotService_MakeZoningLot = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ZoningLot,
  /**
   * @param {!proto.MakeZoningLotRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ZoningLot.deserializeBinary
);


/**
 * @param {!proto.MakeZoningLotRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ZoningLot)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ZoningLot>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ZoningLotServiceClient.prototype.makeZoningLot =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ZoningLotService/MakeZoningLot',
      request,
      metadata || {},
      methodDescriptor_ZoningLotService_MakeZoningLot,
      callback);
};


/**
 * @param {!proto.MakeZoningLotRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ZoningLot>}
 *     Promise that resolves to the response
 */
proto.ZoningLotServicePromiseClient.prototype.makeZoningLot =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ZoningLotService/MakeZoningLot',
      request,
      metadata || {},
      methodDescriptor_ZoningLotService_MakeZoningLot);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ZoningLot,
 *   !proto.ZoningEnvelope>}
 */
const methodDescriptor_ZoningLotService_MakeZoningEnvelope = new grpc.web.MethodDescriptor(
  '/ZoningLotService/MakeZoningEnvelope',
  grpc.web.MethodType.UNARY,
  proto.ZoningLot,
  proto.ZoningEnvelope,
  /**
   * @param {!proto.ZoningLot} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ZoningEnvelope.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ZoningLot,
 *   !proto.ZoningEnvelope>}
 */
const methodInfo_ZoningLotService_MakeZoningEnvelope = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ZoningEnvelope,
  /**
   * @param {!proto.ZoningLot} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ZoningEnvelope.deserializeBinary
);


/**
 * @param {!proto.ZoningLot} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ZoningEnvelope)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ZoningEnvelope>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ZoningLotServiceClient.prototype.makeZoningEnvelope =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ZoningLotService/MakeZoningEnvelope',
      request,
      metadata || {},
      methodDescriptor_ZoningLotService_MakeZoningEnvelope,
      callback);
};


/**
 * @param {!proto.ZoningLot} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ZoningEnvelope>}
 *     Promise that resolves to the response
 */
proto.ZoningLotServicePromiseClient.prototype.makeZoningEnvelope =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ZoningLotService/MakeZoningEnvelope',
      request,
      metadata || {},
      methodDescriptor_ZoningLotService_MakeZoningEnvelope);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.ZoningEnvelopeServiceClient =
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
proto.ZoningEnvelopeServicePromiseClient =
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
 *   !proto.ZoningLot,
 *   !proto.ZoningEnvelope>}
 */
const methodDescriptor_ZoningEnvelopeService_MakeZoningEnvelope = new grpc.web.MethodDescriptor(
  '/ZoningEnvelopeService/MakeZoningEnvelope',
  grpc.web.MethodType.UNARY,
  proto.ZoningLot,
  proto.ZoningEnvelope,
  /**
   * @param {!proto.ZoningLot} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ZoningEnvelope.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ZoningLot,
 *   !proto.ZoningEnvelope>}
 */
const methodInfo_ZoningEnvelopeService_MakeZoningEnvelope = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ZoningEnvelope,
  /**
   * @param {!proto.ZoningLot} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ZoningEnvelope.deserializeBinary
);


/**
 * @param {!proto.ZoningLot} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ZoningEnvelope)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ZoningEnvelope>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ZoningEnvelopeServiceClient.prototype.makeZoningEnvelope =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ZoningEnvelopeService/MakeZoningEnvelope',
      request,
      metadata || {},
      methodDescriptor_ZoningEnvelopeService_MakeZoningEnvelope,
      callback);
};


/**
 * @param {!proto.ZoningLot} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ZoningEnvelope>}
 *     Promise that resolves to the response
 */
proto.ZoningEnvelopeServicePromiseClient.prototype.makeZoningEnvelope =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ZoningEnvelopeService/MakeZoningEnvelope',
      request,
      metadata || {},
      methodDescriptor_ZoningEnvelopeService_MakeZoningEnvelope);
};


module.exports = proto;

