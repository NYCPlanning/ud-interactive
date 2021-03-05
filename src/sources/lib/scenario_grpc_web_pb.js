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
const proto = require('./scenario_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.ScenarioSummaryServiceClient =
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
proto.ScenarioSummaryServicePromiseClient =
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
 *   !proto.Scenario,
 *   !proto.ScenarioSummary>}
 */
const methodDescriptor_ScenarioSummaryService_GetScenarioTable = new grpc.web.MethodDescriptor(
  '/ScenarioSummaryService/GetScenarioTable',
  grpc.web.MethodType.UNARY,
  proto.Scenario,
  summary_pb.ScenarioSummary,
  /**
   * @param {!proto.Scenario} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  summary_pb.ScenarioSummary.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Scenario,
 *   !proto.ScenarioSummary>}
 */
const methodInfo_ScenarioSummaryService_GetScenarioTable = new grpc.web.AbstractClientBase.MethodInfo(
  summary_pb.ScenarioSummary,
  /**
   * @param {!proto.Scenario} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  summary_pb.ScenarioSummary.deserializeBinary
);


/**
 * @param {!proto.Scenario} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ScenarioSummary)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ScenarioSummary>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ScenarioSummaryServiceClient.prototype.getScenarioTable =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ScenarioSummaryService/GetScenarioTable',
      request,
      metadata || {},
      methodDescriptor_ScenarioSummaryService_GetScenarioTable,
      callback);
};


/**
 * @param {!proto.Scenario} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ScenarioSummary>}
 *     Promise that resolves to the response
 */
proto.ScenarioSummaryServicePromiseClient.prototype.getScenarioTable =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ScenarioSummaryService/GetScenarioTable',
      request,
      metadata || {},
      methodDescriptor_ScenarioSummaryService_GetScenarioTable);
};


module.exports = proto;

