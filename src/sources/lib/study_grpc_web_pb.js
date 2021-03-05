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

var summary_pb = require('./summary_pb.js')

var zoning_lot_pb = require('./zoning_lot_pb.js')
const proto = require('./study_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.StudySummaryServiceClient =
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
proto.StudySummaryServicePromiseClient =
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
 *   !proto.Study,
 *   !proto.StudySummary>}
 */
const methodDescriptor_StudySummaryService_GetRWCDSTable = new grpc.web.MethodDescriptor(
  '/StudySummaryService/GetRWCDSTable',
  grpc.web.MethodType.UNARY,
  proto.Study,
  summary_pb.StudySummary,
  /**
   * @param {!proto.Study} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  summary_pb.StudySummary.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Study,
 *   !proto.StudySummary>}
 */
const methodInfo_StudySummaryService_GetRWCDSTable = new grpc.web.AbstractClientBase.MethodInfo(
  summary_pb.StudySummary,
  /**
   * @param {!proto.Study} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  summary_pb.StudySummary.deserializeBinary
);


/**
 * @param {!proto.Study} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.StudySummary)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.StudySummary>|undefined}
 *     The XHR Node Readable Stream
 */
proto.StudySummaryServiceClient.prototype.getRWCDSTable =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/StudySummaryService/GetRWCDSTable',
      request,
      metadata || {},
      methodDescriptor_StudySummaryService_GetRWCDSTable,
      callback);
};


/**
 * @param {!proto.Study} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.StudySummary>}
 *     Promise that resolves to the response
 */
proto.StudySummaryServicePromiseClient.prototype.getRWCDSTable =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/StudySummaryService/GetRWCDSTable',
      request,
      metadata || {},
      methodDescriptor_StudySummaryService_GetRWCDSTable);
};


module.exports = proto;

