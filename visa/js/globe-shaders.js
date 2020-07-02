!function n(e,o,i){function t(r,v){if(!o[r]){if(!e[r]){var s="function"==typeof require&&require;if(!v&&s)return s(r,!0);if(a)return a(r,!0);var c=new Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}var l=o[r]={exports:{}};e[r][0].call(l.exports,function(n){var o=e[r][1][n];return t(o?o:n)},l,l.exports,n,e,o,i)}return o[r].exports}for(var a="function"==typeof require&&require,r=0;r<i.length;r++)t(i[r]);return t}({1:[function(n,e,o){window.shaderList={globe:{vertex:"\n#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\n\n#define M_PI 3.1415926535897932384626433832795\n#define M_PI2 6.283185307179586476925286766559\n\nuniform float radius;\nuniform float length;\nuniform vec3 camPos;\nuniform float camDist;\nuniform float zoom;\n\nattribute float i;\nattribute vec2 latlng;\n\nvarying vec4 stagePos;\nvarying vec3 pos;\nvarying float vIndex;\nvarying vec2 vUv;\nvarying vec3 vNormal;\nvarying float dist;\nvarying vec2 vlatlng;\n\n\nfloat distance3D_1_0 (vec3 v1_1_1, vec3 v2_1_2)\n{\n    float dx = v1_1_1.x - v2_1_2.x;\n    float dy = v1_1_1.y - v2_1_2.y;\n    float dz = v1_1_1.z - v2_1_2.z;\n\n    return sqrt(dx*dx+dy*dy+dz*dz);\n}\n\n\n\n\nvoid main() { \n\n    vIndex = i;\n    vlatlng = latlng;\n\n    float rad = radius;\n\n    pos = position;\n\n    vUv = uv;\n\n    stagePos = modelMatrix * vec4(pos,1.0);\n\n    float cDist = camDist - rad;\n\n    dist = 1.0 - max(0.0, min(1.0, (distance3D_1_0(stagePos.xyz, camPos) - cDist - 130.0) / (camDist  - cDist)));\n\n    gl_PointSize = floor(3.0 + abs(1.0 - zoom) * 6.0);\n\n    vNormal = normalize(stagePos.xyz);\n    gl_Position = projectionMatrix *\n                modelViewMatrix *\n                vec4(pos,1.0);  \n}\n",fragment:"\n#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\n\nuniform float length;\nuniform float radius;\nuniform float reveal;\nuniform float percTime;\n\nuniform sampler2D earth;\nuniform sampler2D particle;\n\nuniform vec3 camPos;\nuniform float camDist;\n\nvarying vec4 stagePos;\nvarying vec3 pos;\nvarying float vIndex;\nvarying vec2 vUv;\nvarying vec3 vNormal;\nvarying float dist;\nvarying vec2 vlatlng;\n\nvoid main() {\n    vec4 earth = texture2D(earth, vUv);\n    vec4 p = texture2D(particle, gl_PointCoord);\n\n     float revAlpha = min(1.0, max(0.0, (reveal - abs(vlatlng.y)) ));\n\n    float distColor = max(0.0, dist - 0.2);\n\n    vec3 col = vec3(139.0 / 255.0, 127.0 / 255.0, 192.0 / 255.0);\n\n    gl_FragColor = vec4(col * p.rgb * earth.rgb * vec3(distColor) * percTime, p.a * dist);\n}\n"},lightBeam:{vertex:"\n#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\n\n#define M_PI 3.1415926535897932384626433832795\n\nuniform float time;\n\nuniform float vLength;\nuniform float radius;\nuniform vec3 camPos;\nuniform float camDist;\nuniform float weight;\nuniform float total;\nuniform float distRatio;\nuniform float extraBounce;\n\nattribute float ind;\nattribute vec2 rand;\n\nvarying vec4 stagePos;\nvarying vec3 oldPos;\nvarying vec3 pos;\n\nvarying vec2 vUv;\nvarying vec2 vrand;\nvarying float vInd;\n\nvarying float dist;\n\n\nfloat distance3D_1_0 (vec3 v1_1_1, vec3 v2_1_2)\n{\n    float dx = v1_1_1.x - v2_1_2.x;\n    float dy = v1_1_1.y - v2_1_2.y;\n    float dz = v1_1_1.z - v2_1_2.z;\n\n    return sqrt(dx*dx+dy*dy+dz*dz);\n}\n\n\n\n\nvoid main() {\n    pos = position;\n    oldPos = position;\n\n    vUv = uv;\n    vInd = ind;\n    vrand = rand;\n\n    float vecMiddle = (1.0 - (abs(mod(vInd / vLength, 1.0) - 0.5) * 2.0));\n\n    float capWeight = min(weight, 1.2);\n\n    pos.x += cos(rand.y * M_PI * 2.0 + rand.y) * (6.0 + 12.0 * rand.y * capWeight * sin(time)) * vecMiddle * distRatio;\n    pos.y += sin(rand.y * M_PI * 2.0 + rand.y) * (6.0 + 12.0 * rand.y * capWeight * cos(time)) * vecMiddle * distRatio;\n    pos.z += sin(rand.y * M_PI * 2.0 + rand.y) * (6.0 + 12.0 * rand.y * capWeight * sin(time)) * vecMiddle * distRatio;\n\n    pos += normalize(pos.xyz) * sin(vInd / vLength * 10.0 + time * 4.0) * (15.0 + (2.0 + extraBounce) * capWeight) * vecMiddle * distRatio; \n\n    vec3 T = cross(normalize(pos.xyz), vec3(0.0,0.0,1.0));\n\n    pos += T * sin(vInd / vLength * 10.0 + time * 4.0) * (15.0 + (2.0 + extraBounce) * capWeight) * vecMiddle * distRatio; \n\n    stagePos = modelMatrix * vec4(pos,1.0);\n\n    float cDist = camDist - radius;\n    dist = 1.0 - max(0.0, min(1.0, (distance3D_1_0(stagePos.xyz, camPos) - cDist - 50.0) / (camDist - cDist)));\n\n    gl_Position = projectionMatrix *\n                modelViewMatrix *\n                vec4(pos,1.0);  \n}\n",fragment:"\n#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\n\nuniform float time;\nuniform float vLength;\nuniform float direction;\nuniform float total;\nuniform vec3 color;\n\nuniform float reveal;\nuniform float weight;\n\nvarying vec4 stagePos;\nvarying vec3 pos;\nvarying vec2 vUv;\nvarying float vInd;\nvarying vec2 vrand;\nvarying vec3 oldPos;\n\nvarying float dist;\n\nvoid main() {\n    float ind = mod(vInd, vLength);\n    float uvY = abs((direction - ind / vLength));\n\n    float modTime = mod(time + weight * 2.0, 1.0);\n\n    float vecMiddle = (1.0 - (abs(mod(vInd / vLength, 1.0) - 0.5) * 2.0));\n\n    float revAlpha = max(0.0, min(1.0, reveal - vInd / vLength));\n\n    // * ((cos(uvY + time + time * weight) + 1.0) * 0.5)\n    float colTime = vInd / vLength + (1.0 - abs(modTime * 2.0 - 1.0));\n    vec3 col = color;\n\n    float toSee = 5.0 + 10.0 * ((sin(time * (ind / vLength) + time * vrand.y * 10.0) + 1.0)) * 0.5;\n\n    float baseAlpha = vecMiddle * vrand.y * (1.0 - (abs(oldPos.x - pos.x) / toSee + abs(oldPos.y - pos.y) / toSee) * 0.5);\n    float alpha = ceil(reveal - abs(direction - ind / vLength)) * dist * max(0.25, min(1.3, weight)) * baseAlpha;\n\n    gl_FragColor = vec4(col, min(0.8, alpha)); \n}\n"},particlesLine:{vertex:"\n#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\n\n\nfloat distance3D_2_0 (vec3 v1_2_1, vec3 v2_2_2)\n{\n    float dx = v1_2_1.x - v2_2_2.x;\n    float dy = v1_2_1.y - v2_2_2.y;\n    float dz = v1_2_1.z - v2_2_2.z;\n\n    return sqrt(dx*dx+dy*dy+dz*dz);\n}\n\n\n\nvec3 translateLatLng_1_3(float perc, vec2 from, vec2 to, float distance) {\n\n    float a = sin((1.0 - perc) * distance) / sin(distance);\n    float b = sin(perc * distance) / sin(distance);\n\n    return vec3(\n        a * cos(from.x) * cos(from.y)  + b * cos(to.x) * cos(to.y),\n        a * sin(from.x)                + b * sin(to.x),\n        a * cos(from.x) * sin(from.y)  + b * cos(to.x) * sin(to.y)\n    );\n}\n\n\n\n\n#define M_PI 3.1415926535897932384626433832795\n\nuniform vec3 camPos;\nuniform float camDist;\nuniform float radius;\n\n\nuniform vec2 from;\nuniform vec2 to;\nuniform float vLength;\nuniform float weight;\nuniform float distance;\nuniform float time;\nuniform float direction;\nuniform float zoom;\nuniform float distRatio;\nuniform float extraBounce;\nuniform vec2 window;\nuniform vec2 mousePos;\nuniform float mouseRadius;\nuniform float mouseHeight;\n\nattribute vec3 movePar;\nattribute float ind;\nattribute float percBetween;\n\nvarying vec4 stagePos;\nvarying vec3 pos;\nvarying vec3 vNormal;\nvarying float dist;\nvarying float distCol;\nvarying float modTime;\nvarying float modTime2;\nvarying float vInd;\nvarying float vPBetween;\nvarying vec3 vmovePar;\nvarying float vMouseDist;\n\n\nfloat getDistToMouse(vec2 vPos) {\n    float distX = mousePos.x - (vPos.x * 0.5 + 0.5);\n    float distY = mousePos.y - (1.0 - vPos.y) * 0.5;\n\n    return 1.0 - min(1.0, (distX * distX + distY * distY) / 0.02);\n}\n\nvoid main() {\n    pos = position;\n\n    vmovePar = movePar;\n\n    vPBetween = percBetween;\n    vInd = ind;\n\n    float capWeight = min(1.3, weight);\n\n    float speed = time * (0.1 + capWeight * 0.2);\n\n    modTime = mod(percBetween * speed, 1.0);\n    modTime2 = mod(percBetween * -1.0 * speed, 1.0);\n\n    float placeMiddle = 1.0 - abs(modTime - 0.5) * 2.0;\n    float placeMiddle2 = 1.0 - abs(modTime2 - 0.5) * 2.0;\n\n    float rad = radius + sin(placeMiddle2) * (max(10.0, distance * 18.0) + movePar.z * (1.0 - percBetween) * capWeight * distRatio);\n\n    float percFloor = floor(percBetween * 5.0) * 0.2;\n\n    float angle = atan(to.y - from.y, to.x - from.x) + (ceil(mod(vInd, 2.0)) * 2.0 - 1.0) * M_PI * 0.5;\n\n    float addRad = (movePar.z + movePar.x * 800.0) * 0.005 * percBetween * distRatio;\n\n    vec2 fromMod = from + vec2(cos(angle), sin(angle)) * vec2(addRad);\n    vec2 toMod = to + vec2(cos(angle), sin(angle)) * vec2(addRad);\n    vec2 fromFinal = fromMod * placeMiddle2 + from * (1.0 - placeMiddle2);\n    vec2 toFinal = toMod * placeMiddle2 + to * (1.0 - placeMiddle2);\n    pos = translateLatLng_1_3(modTime2, fromFinal, toFinal, distance) * vec3(rad);\n\n    gl_PointSize = min(2.0, floor(1.0 + weight));\n\n    pos += normalize(pos.xyz) * sin(modTime2 * 10.0 + time * 4.0) * (15.0 + 2.0 * capWeight) * placeMiddle * distRatio; \n\n\n    vec3 T = cross(normalize(pos.xyz), vec3(0.0,0.0,1.0));\n\n    pos += (T * sin(modTime2 * 10.0 + time * 4.0) * (15.0 + 2.0 * capWeight)) * placeMiddle * distRatio; \n\n    stagePos = modelMatrix * vec4(pos,1.0);\n    vNormal = normalize(stagePos.xyz);\n\n    float cDist = camDist - radius;\n    dist = 1.0 - max(0.0, min(1.0, (distance3D_2_0(stagePos.xyz, camPos) - cDist - 50.0) / (camDist  - cDist)));\n    distCol = 1.0 - max(0.0, min(1.0, (distance3D_2_0(stagePos.xyz, camPos) - cDist - 100.0) / (camDist  - cDist)));\n\n    vec4 fake_frag_coord = projectionMatrix * modelViewMatrix * vec4(pos,1.0);\n    fake_frag_coord.xyz /= fake_frag_coord.w; \n    fake_frag_coord.xyz *= vec3 (0.5) + vec3(0.5);\n\n\n    vMouseDist = getDistToMouse(fake_frag_coord.xy);\n\n    pos += normalize(pos.xyz) * (vMouseDist * mouseHeight * max(0.7, capWeight) * movePar.x * 100.0);\n\n    gl_Position = projectionMatrix *\n                modelViewMatrix *\n                vec4(pos,1.0);  \n}\n",fragment:"\n#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\nuniform sampler2D particle;\nuniform float weight;\nuniform float reveal;\nuniform float vLength;\nuniform float direction;\nuniform vec3 color;\nuniform vec2 vel;\n\nvarying vec4 stagePos;\nvarying vec3 pos;\nvarying float dist;\nvarying float distCol;\nvarying float modTime;\nvarying float modTime2;\nvarying float vInd;\nvarying float vPBetween;\nvarying float vMouseDist;\nvarying vec3 vmovePar;\n\nvoid main() {\n\n    // vec4 p = texture2D(particle, gl_PointCoord);\n\n    float revAlpha = max(0.0, min(1.0, ceil(reveal - abs(direction - modTime2))));\n    float capWeight = min(weight, 1.3) * 0.6;\n    float alpha = (min((0.2 + capWeight + (abs(vel.x) + abs(vel.y) * 8.0)), 0.75) * vmovePar.y)  * revAlpha * dist;\n\n    gl_FragColor = vec4(color , alpha);\n}\n"},planebeam:{vertex:"\n#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\n\n\nuniform float time;\n\nuniform float vLength;\nuniform float radius;\nuniform vec3 camPos;\nuniform float camDist;\nuniform float weight;\nuniform float extraBounce;\nuniform float distRatio;\n\nattribute float ind;\nattribute float indX;\nattribute float rand;\n\nvarying vec4 stagePos;\nvarying vec3 pos;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying float modTime;\nvarying float dist;\nvarying float vInd;\nvarying float vIndX;\nvarying float vecMiddle;\nvarying float vRand;\nvarying float vNoise;\n\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_4_0(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289_4_0(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute_4_1(vec3 x) {\n  return mod289_4_0(((x*34.0)+1.0)*x);\n}\n\nfloat snoise_4_2(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289_4_0(i); // Avoid truncation effects in permutation\n  vec3 p = permute_4_1( permute_4_1( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\n\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_5_3(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_5_3(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_5_4(vec4 x) {\n     return mod289_5_3(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_5_5(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_5_6(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D_5_7 = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_5_8 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_5_8;\n  vec3 i1 = min( g_5_8.xyz, l.zxy );\n  vec3 i2 = max( g_5_8.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D_5_7.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_5_3(i);\n  vec4 p = permute_5_4( permute_5_4( permute_5_4(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D_5_7.wyz - D_5_7.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1_5_9 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_5_10 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1_5_9.xy,h.z);\n  vec3 p3 = vec3(a1_5_9.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_5_5(vec4(dot(p0_5_10,p0_5_10), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_5_10 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_5_10,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n\n\n\n\nfloat distance3D_1_11 (vec3 v1_1_12, vec3 v2_1_13)\n{\n    float dx = v1_1_12.x - v2_1_13.x;\n    float dy = v1_1_12.y - v2_1_13.y;\n    float dz = v1_1_12.z - v2_1_13.z;\n\n    return sqrt(dx*dx+dy*dy+dz*dz);\n}\n\n\n\n\nvec2 vectolatlng_2_14(vec3 pos) {\n    return vec2(\n        atan(pos.y, sqrt(pos.x * pos.x + pos.z * pos.z)),\n        atan(pos.z, pos.x)\n    );\n}\n\n\n\n\n\nvec3 posOnSphere_3_15(vec2 latlng, float radius) {\n    return vec3(\n        cos(latlng.x) * cos(latlng.y) * radius,\n        sin(latlng.x) * radius,\n        cos(latlng.x) * sin(latlng.y) * radius\n    );\n}\n\n\n\n\nvoid main() {\n    pos = position;\n    vec4 tempPos = modelMatrix * vec4(pos, 1.0);\n    vUv = uv;\n\n    vInd = ind;\n    vIndX = indX;\n    vRand = rand;\n\n    float capWeight = min(weight, 1.2);\n\n    vecMiddle = (1.0 - (abs(mod(vInd / vLength, 1.0) - 0.5) * 2.0));\n\n    // vNormal = normalize(tempPos.xyz);\n\n    // pos -= normalize(pos.xyz) * (abs(vUv.x * 2.0 - 1.0)) * vecMiddle * distRatio * 25.0 * ((cos(time * 5.0) + 1.0) * 0.5) * (1.0 - indX); \n\n    vNormal = normalize(pos.xyz);\n\n    pos += (vNormal * sin(uv.y * 10.0 + time * 4.0) * (15.0 + 2.0 * capWeight) * vecMiddle * distRatio) * (indX);\n\n    vec3 T = cross(normalize(pos.xyz), vec3(0.0,0.0,1.0));\n\n    pos += ((T * sin(uv.y * 10.0 + time * 4.0)) * (15.0 + 2.0 * capWeight) * vecMiddle * distRatio) * (indX);\n\n    stagePos = modelMatrix * vec4(pos, 1.0);\n\n    float uvX = uv.x * 2.0 - 1.0;\n    float n = (snoise_4_2(vec2(uvX + rand * -1.0 * sign(uvX) * time * 0.3, 0.1) * 5.0) + 1.0) * 0.5;\n    vNoise = n * indX;\n    pos += normalize(stagePos.xyz) * vNoise * 5.0;\n\n    float cDist = camDist - radius;\n    dist = 1.0 - max(0.0, min(1.0, (distance3D_1_11(stagePos.xyz, camPos) - cDist - 50.0) / (camDist - cDist)));\n    gl_Position = projectionMatrix *\n                modelViewMatrix *\n                vec4(pos,1.0);  \n}\n",fragment:"\n#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\n\nuniform float vLength;\nuniform float time;\nuniform float weight;\nuniform sampler2D trailTexture;\nuniform vec2 textSize;\nuniform float reveal;\nuniform float direction;\nuniform float distRatio;\nuniform vec3 color;\nuniform vec2 vel;\n\nvarying vec4 stagePos;\nvarying vec3 pos;\nvarying vec2 vUv;\nvarying float vInd;\nvarying float vecMiddle;\nvarying float vIndX;\nvarying float vRand;\nvarying float vNoise;\n    \nvarying float dist;\n\nvoid main() {\n\n    vec2 uv = vUv;\n    float percY = vInd / vLength;\n    \n    float capWeight = min(weight, 1.3);\n\n    float alphaEdge = 1.0 - abs(vUv.x * 2.0 - 1.0);\n\n    float revAlpha = max(0.0, min(1.0, ceil(reveal - abs(direction - percY))));\n\n    gl_FragColor = vec4(color, (max(0.2, vNoise * 2.0) + (abs(vel.x) + abs(vel.y)) * 8.0) * reveal * dist * alphaEdge * vecMiddle * max(0.2, capWeight));\n}\n"},label:{vertex:"\n#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\n\n\nfloat distance3D_1_0 (vec3 v1_1_1, vec3 v2_1_2)\n{\n    float dx = v1_1_1.x - v2_1_2.x;\n    float dy = v1_1_1.y - v2_1_2.y;\n    float dz = v1_1_1.z - v2_1_2.z;\n\n    return sqrt(dx*dx+dy*dy+dz*dz);\n}\n\n\n\n\nuniform float radius;\nuniform vec3 camPos;\nuniform float camDist;\n\nvarying vec4 stagePos;\nvarying vec3 pos;\nvarying vec2 vUv;\nvarying float dist;\n\nvoid main() {\n    pos = position;\n    vUv = uv;\n    stagePos = modelMatrix * vec4(pos,1.0);\n\n    float cDist = camDist - radius;\n    dist = 1.0 - max(0.0, min(1.0, (distance3D_1_0(stagePos.xyz, camPos) - cDist - 150.0) / (camDist - cDist)));\n\n    gl_Position = projectionMatrix *\n                modelViewMatrix *\n                vec4(pos,1.0);  \n}\n",fragment:"\n#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\n\nuniform sampler2D texture;\nuniform float reveal;\n\nvarying vec4 stagePos;\nvarying vec3 pos;\nvarying vec2 vUv;\nvarying float dist;\n\nvoid main() {\n    // texture2D(texture, vUv)\n    gl_FragColor = vec4(texture2D(texture, vec2(1.0 - vUv.x, vUv.y))) * dist * reveal;\n} \n"}}},{}]},{},[1]);