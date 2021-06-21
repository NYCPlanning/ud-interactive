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


var model_base_pb = require('./model_base_pb.js')
const proto = require('./site_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.SiteServiceClient =
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
proto.SiteServicePromiseClient =
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
 *   !proto.TaxLot,
 *   !proto.Site>}
 */
const methodDescriptor_SiteService_MakeSite = new grpc.web.MethodDescriptor(
  '/SiteService/MakeSite',
  grpc.web.MethodType.UNARY,
  model_base_pb.TaxLot,
  proto.Site,
  /**
   * @param {!proto.TaxLot} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Site.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.TaxLot,
 *   !proto.Site>}
 */
const methodInfo_SiteService_MakeSite = new grpc.web.AbstractClientBase.MethodInfo(
  proto.Site,
  /**
   * @param {!proto.TaxLot} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Site.deserializeBinary
);


/**
 * @param {!proto.TaxLot} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Site)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Site>|undefined}
 *     The XHR Node Readable Stream
 */
proto.SiteServiceClient.prototype.makeSite =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/SiteService/MakeSite',
      request,
      metadata || {},
      methodDescriptor_SiteService_MakeSite,
      callback);
};


/**
 * @param {!proto.TaxLot} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Site>}
 *     Promise that resolves to the response
 */
proto.SiteServicePromiseClient.prototype.makeSite =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/SiteService/MakeSite',
      request,
      metadata || {},
      methodDescriptor_SiteService_MakeSite);
};


module.exports = proto;

