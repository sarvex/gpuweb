// Copyright (C) [2022] World Wide Web Consortium,
// (Massachusetts Institute of Technology, European Research Consortium for
// Informatics and Mathematics, Keio University, Beihang).
// All Rights Reserved.
//
// This work is distributed under the W3C (R) Software License [1] in the hope
// that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
// warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
//
// [1] http://www.w3.org/Consortium/Legal/copyright-software

// **** This file is auto-generated. Do not edit. ****

module.exports = grammar({
    name: 'wgsl',

    externals: $ => [
        $._block_comment,
    ],

    extras: $ => [
        $._comment,
        $._block_comment,
        $._blankspace,
    ],

    inline: $ => [
        $.global_decl,
        $._reserved,
    ],

    // WGSL has no parsing conflicts.
    conflicts: $ => [],

    word: $ => $.ident_pattern_token,

    rules: {
        translation_unit: $ => seq(optional(repeat1($.global_directive)), optional(repeat1($.global_decl))),
        global_directive: $ => $.enable_directive,
        global_decl: $ => choice(
            $.semicolon,
            seq($.global_variable_decl, $.semicolon),
            seq($.global_constant_decl, $.semicolon),
            seq($.type_alias_decl, $.semicolon),
            $.struct_decl,
            $.function_decl,
            seq($.static_assert_statement, $.semicolon)
        ),
        bool_literal: $ => choice(
            $.true,
            $.false
        ),
        int_literal: $ => choice(
            token(/0[xX][0-9a-fA-F]+[iu]?/),
            token(/0[iu]?/),
            token(/[1-9][0-9]*[iu]?/)
        ),
        float_literal: $ => choice(
            $.decimal_float_literal,
            $.hex_float_literal
        ),
        decimal_float_literal: $ => choice(
            token(/[0-9]*\.[0-9]+([eE][+-]?[0-9]+)?[fh]?/),
            token(/[0-9]+\.[0-9]*([eE][+-]?[0-9]+)?[fh]?/),
            token(/[0-9]+[eE][+-]?[0-9]+[fh]?/),
            token(/0[fh]/),
            token(/[1-9][0-9]*[fh]/)
        ),
        hex_float_literal: $ => choice(
            token(/0[xX][0-9a-fA-F]*\.[0-9a-fA-F]+([pP][+-]?[0-9]+[fh]?)?/),
            token(/0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*([pP][+-]?[0-9]+[fh]?)?/),
            token(/0[xX][0-9a-fA-F]+[pP][+-]?[0-9]+[fh]?/)
        ),
        const_literal: $ => choice(
            $.int_literal,
            $.float_literal,
            $.bool_literal
        ),
        ident_or_int_literal: $ => choice(
            $.int_literal,
            $.ident
        ),
        member_ident: $ => $.ident_pattern_token,
        attribute: $ => choice(
            seq($.attr, token('align'), $.paren_left, $.int_literal, $.attrib_end),
            seq($.attr, token('binding'), $.paren_left, $.int_literal, $.attrib_end),
            seq($.attr, token('builtin'), $.paren_left, $.builtin_value_name, $.attrib_end),
            seq($.attr, token('const')),
            seq($.attr, token('group'), $.paren_left, $.int_literal, $.attrib_end),
            seq($.attr, token('id'), $.paren_left, $.int_literal, $.attrib_end),
            seq($.attr, token('interpolate'), $.paren_left, $.interpolation_type_name, $.attrib_end),
            seq($.attr, token('interpolate'), $.paren_left, $.interpolation_type_name, $.comma, $.interpolation_sample_name, $.attrib_end),
            seq($.attr, token('invariant')),
            seq($.attr, token('location'), $.paren_left, $.int_literal, $.attrib_end),
            seq($.attr, token('size'), $.paren_left, $.int_literal, $.attrib_end),
            seq($.attr, token('workgroup_size'), $.paren_left, $.ident_or_int_literal, $.attrib_end),
            seq($.attr, token('workgroup_size'), $.paren_left, $.ident_or_int_literal, $.comma, $.ident_or_int_literal, $.attrib_end),
            seq($.attr, token('workgroup_size'), $.paren_left, $.ident_or_int_literal, $.comma, $.ident_or_int_literal, $.comma, $.ident_or_int_literal, $.attrib_end),
            seq($.attr, token('vertex')),
            seq($.attr, token('fragment')),
            seq($.attr, token('compute'))
        ),
        attrib_end: $ => seq(optional($.comma), $.paren_right),
        array_type_decl: $ => seq($.array, $.less_than, $.type_decl, optional(seq($.comma, $.element_count_expression)), $.greater_than),
        element_count_expression: $ => choice(
            $.additive_expression,
            $.bitwise_expression
        ),
        struct_decl: $ => seq($.struct, $.ident, $.struct_body_decl),
        struct_body_decl: $ => seq($.brace_left, optional(repeat1(seq($.struct_member, $.comma))), $.struct_member, optional($.comma), $.brace_right),
        struct_member: $ => seq(optional(repeat1($.attribute)), $.member_ident, $.colon, $.type_decl),
        texture_and_sampler_types: $ => choice(
            $.sampler_type,
            $.depth_texture_type,
            seq($.sampled_texture_type, $.less_than, $.type_decl, $.greater_than),
            seq($.multisampled_texture_type, $.less_than, $.type_decl, $.greater_than),
            seq($.storage_texture_type, $.less_than, $.texel_format, $.comma, $.access_mode, $.greater_than)
        ),
        sampler_type: $ => choice(
            $.sampler,
            $.sampler_comparison
        ),
        sampled_texture_type: $ => choice(
            $.texture_1d,
            $.texture_2d,
            $.texture_2d_array,
            $.texture_3d,
            $.texture_cube,
            $.texture_cube_array
        ),
        multisampled_texture_type: $ => $.texture_multisampled_2d,
        storage_texture_type: $ => choice(
            $.texture_storage_1d,
            $.texture_storage_2d,
            $.texture_storage_2d_array,
            $.texture_storage_3d
        ),
        depth_texture_type: $ => choice(
            $.texture_depth_2d,
            $.texture_depth_2d_array,
            $.texture_depth_cube,
            $.texture_depth_cube_array,
            $.texture_depth_multisampled_2d
        ),
        type_alias_decl: $ => seq($.type, $.ident, $.equal, $.type_decl),
        type_decl: $ => choice(
            $.ident,
            $.type_decl_without_ident
        ),
        type_decl_without_ident: $ => choice(
            $.bool,
            $.float32,
            $.float16,
            $.int32,
            $.uint32,
            seq($.vec_prefix, $.less_than, $.type_decl, $.greater_than),
            seq($.mat_prefix, $.less_than, $.type_decl, $.greater_than),
            seq($.pointer, $.less_than, $.address_space, $.comma, $.type_decl, optional(seq($.comma, $.access_mode)), $.greater_than),
            $.array_type_decl,
            seq($.atomic, $.less_than, $.type_decl, $.greater_than),
            $.texture_and_sampler_types
        ),
        vec_prefix: $ => choice(
            $.vec2,
            $.vec3,
            $.vec4
        ),
        mat_prefix: $ => choice(
            $.mat2x2,
            $.mat2x3,
            $.mat2x4,
            $.mat3x2,
            $.mat3x3,
            $.mat3x4,
            $.mat4x2,
            $.mat4x3,
            $.mat4x4
        ),
        variable_statement: $ => choice(
            $.variable_decl,
            seq($.variable_decl, $.equal, $.expression),
            seq($.let, choice($.ident, $.variable_ident_decl), $.equal, $.expression),
            seq($.const, choice($.ident, $.variable_ident_decl), $.equal, $.expression)
        ),
        variable_decl: $ => seq($.var, optional($.variable_qualifier), choice($.ident, $.variable_ident_decl)),
        variable_ident_decl: $ => seq($.ident, $.colon, $.type_decl),
        variable_qualifier: $ => seq($.less_than, $.address_space, optional(seq($.comma, $.access_mode)), $.greater_than),
        global_variable_decl: $ => seq(optional(repeat1($.attribute)), $.variable_decl, optional(seq($.equal, $.expression))),
        global_constant_decl: $ => choice(
            seq($.const, choice($.ident, $.variable_ident_decl), $.equal, $.expression),
            seq(optional(repeat1($.attribute)), $.override, choice($.ident, $.variable_ident_decl), optional(seq($.equal, $.expression)))
        ),
        primary_expression: $ => choice(
            $.ident,
            seq($.callable, $.argument_expression_list),
            $.const_literal,
            $.paren_expression,
            seq($.bitcast, $.less_than, $.type_decl, $.greater_than, $.paren_expression)
        ),
        callable: $ => choice(
            $.ident,
            $.type_decl_without_ident,
            $.vec_prefix,
            $.mat_prefix
        ),
        paren_expression: $ => seq($.paren_left, $.expression, $.paren_right),
        argument_expression_list: $ => seq($.paren_left, optional(seq(optional(repeat1(seq($.expression, $.comma))), $.expression, optional($.comma))), $.paren_right),
        postfix_expression: $ => choice(
            seq($.bracket_left, $.expression, $.bracket_right, optional($.postfix_expression)),
            seq($.period, $.member_ident, optional($.postfix_expression)),
            seq($.period, $.swizzle_name, optional($.postfix_expression))
        ),
        unary_expression: $ => choice(
            $.singular_expression,
            seq($.minus, $.unary_expression),
            seq($.bang, $.unary_expression),
            seq($.tilde, $.unary_expression),
            seq($.star, $.unary_expression),
            seq($.and, $.unary_expression)
        ),
        singular_expression: $ => seq($.primary_expression, optional($.postfix_expression)),
        lhs_expression: $ => seq(optional(repeat1(choice($.star, $.and))), $.core_lhs_expression, optional($.postfix_expression)),
        core_lhs_expression: $ => choice(
            $.ident,
            seq($.paren_left, $.lhs_expression, $.paren_right)
        ),
        multiplicative_expression: $ => choice(
            $.unary_expression,
            seq($.multiplicative_expression, $.star, $.unary_expression),
            seq($.multiplicative_expression, $.forward_slash, $.unary_expression),
            seq($.multiplicative_expression, $.modulo, $.unary_expression)
        ),
        additive_expression: $ => choice(
            $.multiplicative_expression,
            seq($.additive_expression, $.plus, $.multiplicative_expression),
            seq($.additive_expression, $.minus, $.multiplicative_expression)
        ),
        shift_expression: $ => choice(
            $.additive_expression,
            seq($.unary_expression, $.shift_left, $.unary_expression),
            seq($.unary_expression, $.shift_right, $.unary_expression)
        ),
        relational_expression: $ => choice(
            $.shift_expression,
            seq($.shift_expression, $.less_than, $.shift_expression),
            seq($.shift_expression, $.greater_than, $.shift_expression),
            seq($.shift_expression, $.less_than_equal, $.shift_expression),
            seq($.shift_expression, $.greater_than_equal, $.shift_expression),
            seq($.shift_expression, $.equal_equal, $.shift_expression),
            seq($.shift_expression, $.not_equal, $.shift_expression)
        ),
        short_circuit_and_expression: $ => choice(
            $.relational_expression,
            seq($.short_circuit_and_expression, $.and_and, $.relational_expression)
        ),
        short_circuit_or_expression: $ => choice(
            $.relational_expression,
            seq($.short_circuit_or_expression, $.or_or, $.relational_expression)
        ),
        binary_or_expression: $ => choice(
            $.unary_expression,
            seq($.binary_or_expression, $.or, $.unary_expression)
        ),
        binary_and_expression: $ => choice(
            $.unary_expression,
            seq($.binary_and_expression, $.and, $.unary_expression)
        ),
        binary_xor_expression: $ => choice(
            $.unary_expression,
            seq($.binary_xor_expression, $.xor, $.unary_expression)
        ),
        bitwise_expression: $ => choice(
            seq($.binary_and_expression, $.and, $.unary_expression),
            seq($.binary_or_expression, $.or, $.unary_expression),
            seq($.binary_xor_expression, $.xor, $.unary_expression)
        ),
        expression: $ => choice(
            $.relational_expression,
            seq($.short_circuit_or_expression, $.or_or, $.relational_expression),
            seq($.short_circuit_and_expression, $.and_and, $.relational_expression),
            $.bitwise_expression
        ),
        compound_statement: $ => seq($.brace_left, optional(repeat1($.statement)), $.brace_right),
        assignment_statement: $ => choice(
            seq($.lhs_expression, choice($.equal, $.compound_assignment_operator), $.expression),
            seq($.underscore, $.equal, $.expression)
        ),
        compound_assignment_operator: $ => choice(
            $.plus_equal,
            $.minus_equal,
            $.times_equal,
            $.division_equal,
            $.modulo_equal,
            $.and_equal,
            $.or_equal,
            $.xor_equal,
            $.shift_right_equal,
            $.shift_left_equal
        ),
        increment_statement: $ => seq($.lhs_expression, $.plus_plus),
        decrement_statement: $ => seq($.lhs_expression, $.minus_minus),
        if_statement: $ => seq($.if_clause, optional(repeat1($.else_if_clause)), optional($.else_clause)),
        if_clause: $ => seq($.if, $.expression, $.compound_statement),
        else_if_clause: $ => seq($.else, $.if, $.expression, $.compound_statement),
        else_clause: $ => seq($.else, $.compound_statement),
        switch_statement: $ => seq($.switch, $.expression, $.brace_left, repeat1($.switch_body), $.brace_right),
        switch_body: $ => choice(
            seq($.case, $.case_selectors, optional($.colon), $.case_compound_statement),
            seq($.default, optional($.colon), $.case_compound_statement)
        ),
        case_selectors: $ => seq($.expression, optional(repeat1(seq($.comma, $.expression))), optional($.comma)),
        case_compound_statement: $ => seq($.brace_left, optional(repeat1($.statement)), optional($.fallthrough_statement), $.brace_right),
        fallthrough_statement: $ => seq($.fallthrough, $.semicolon),
        loop_statement: $ => seq($.loop, $.brace_left, optional(repeat1($.statement)), optional($.continuing_statement), $.brace_right),
        for_statement: $ => seq($.for, $.paren_left, $.for_header, $.paren_right, $.compound_statement),
        for_header: $ => seq(optional($.for_init), $.semicolon, optional($.expression), $.semicolon, optional($.for_update)),
        for_init: $ => choice(
            $.variable_statement,
            $.increment_statement,
            $.decrement_statement,
            $.assignment_statement,
            $.func_call_statement
        ),
        for_update: $ => choice(
            $.increment_statement,
            $.decrement_statement,
            $.assignment_statement,
            $.func_call_statement
        ),
        while_statement: $ => seq($.while, $.expression, $.compound_statement),
        break_statement: $ => $.break,
        break_if_statement: $ => seq($.break, $.if, $.expression, $.semicolon),
        continue_statement: $ => $.continue,
        continuing_statement: $ => seq($.continuing, $.continuing_compound_statement),
        continuing_compound_statement: $ => seq($.brace_left, optional(repeat1($.statement)), optional($.break_if_statement), $.brace_right),
        return_statement: $ => seq($.return, optional($.expression)),
        func_call_statement: $ => seq($.ident, $.argument_expression_list),
        static_assert_statement: $ => seq($.staticAssert, $.expression),
        statement: $ => choice(
            $.semicolon,
            seq($.return_statement, $.semicolon),
            $.if_statement,
            $.switch_statement,
            $.loop_statement,
            $.for_statement,
            $.while_statement,
            seq($.func_call_statement, $.semicolon),
            seq($.variable_statement, $.semicolon),
            seq($.break_statement, $.semicolon),
            seq($.continue_statement, $.semicolon),
            seq($.discard, $.semicolon),
            seq($.assignment_statement, $.semicolon),
            $.compound_statement,
            seq($.increment_statement, $.semicolon),
            seq($.decrement_statement, $.semicolon),
            seq($.static_assert_statement, $.semicolon)
        ),
        function_decl: $ => seq(optional(repeat1($.attribute)), $.function_header, $.compound_statement),
        function_header: $ => seq($.fn, $.ident, $.paren_left, optional($.param_list), $.paren_right, optional(seq($.arrow, optional(repeat1($.attribute)), $.type_decl))),
        param_list: $ => seq(optional(repeat1(seq($.param, $.comma))), $.param, optional($.comma)),
        param: $ => seq(optional(repeat1($.attribute)), $.variable_ident_decl),
        enable_directive: $ => seq($.enable, $.extension_name, $.semicolon),
        address_space: $ => choice(
            $.function,
            $.private,
            $.workgroup,
            $.uniform,
            $.storage
        ),
        ident_pattern_token: $ => token(/([_\p{XID_Start}][\p{XID_Continue}]+)|([\p{XID_Start}])/uy),
        array: $ => token('array'),
        atomic: $ => token('atomic'),
        bool: $ => token('bool'),
        float32: $ => token('f32'),
        float16: $ => token('f16'),
        int32: $ => token('i32'),
        mat2x2: $ => token('mat2x2'),
        mat2x3: $ => token('mat2x3'),
        mat2x4: $ => token('mat2x4'),
        mat3x2: $ => token('mat3x2'),
        mat3x3: $ => token('mat3x3'),
        mat3x4: $ => token('mat3x4'),
        mat4x2: $ => token('mat4x2'),
        mat4x3: $ => token('mat4x3'),
        mat4x4: $ => token('mat4x4'),
        override: $ => token('override'),
        pointer: $ => token('ptr'),
        sampler: $ => token('sampler'),
        sampler_comparison: $ => token('sampler_comparison'),
        staticAssert: $ => token('staticAssert'),
        struct: $ => token('struct'),
        texture_1d: $ => token('texture_1d'),
        texture_2d: $ => token('texture_2d'),
        texture_2d_array: $ => token('texture_2d_array'),
        texture_3d: $ => token('texture_3d'),
        texture_cube: $ => token('texture_cube'),
        texture_cube_array: $ => token('texture_cube_array'),
        texture_multisampled_2d: $ => token('texture_multisampled_2d'),
        texture_storage_1d: $ => token('texture_storage_1d'),
        texture_storage_2d: $ => token('texture_storage_2d'),
        texture_storage_2d_array: $ => token('texture_storage_2d_array'),
        texture_storage_3d: $ => token('texture_storage_3d'),
        texture_depth_2d: $ => token('texture_depth_2d'),
        texture_depth_2d_array: $ => token('texture_depth_2d_array'),
        texture_depth_cube: $ => token('texture_depth_cube'),
        texture_depth_cube_array: $ => token('texture_depth_cube_array'),
        texture_depth_multisampled_2d: $ => token('texture_depth_multisampled_2d'),
        uint32: $ => token('u32'),
        vec2: $ => token('vec2'),
        vec3: $ => token('vec3'),
        vec4: $ => token('vec4'),
        bitcast: $ => token('bitcast'),
        break: $ => token('break'),
        case: $ => token('case'),
        const: $ => token('const'),
        continue: $ => token('continue'),
        continuing: $ => token('continuing'),
        default: $ => token('default'),
        discard: $ => token('discard'),
        else: $ => token('else'),
        enable: $ => token('enable'),
        fallthrough: $ => token('fallthrough'),
        false: $ => token('false'),
        fn: $ => token('fn'),
        for: $ => token('for'),
        function: $ => token('function'),
        if: $ => token('if'),
        let: $ => token('let'),
        loop: $ => token('loop'),
        private: $ => token('private'),
        return: $ => token('return'),
        storage: $ => token('storage'),
        switch: $ => token('switch'),
        true: $ => token('true'),
        type: $ => token('type'),
        uniform: $ => token('uniform'),
        var: $ => token('var'),
        while: $ => token('while'),
        workgroup: $ => token('workgroup'),
        and: $ => token('&'),
        and_and: $ => token('&&'),
        arrow: $ => token('->'),
        attr: $ => token('@'),
        forward_slash: $ => token('/'),
        bang: $ => token('!'),
        bracket_left: $ => token('['),
        bracket_right: $ => token(']'),
        brace_left: $ => token('{'),
        brace_right: $ => token('}'),
        colon: $ => token(':'),
        comma: $ => token(','),
        equal: $ => token('='),
        equal_equal: $ => token('=='),
        not_equal: $ => token('!='),
        greater_than: $ => token('>'),
        greater_than_equal: $ => token('>='),
        shift_right: $ => token('>>'),
        less_than: $ => token('<'),
        less_than_equal: $ => token('<='),
        shift_left: $ => token('<<'),
        modulo: $ => token('%'),
        minus: $ => token('-'),
        minus_minus: $ => token('--'),
        period: $ => token('.'),
        plus: $ => token('+'),
        plus_plus: $ => token('++'),
        or: $ => token('|'),
        or_or: $ => token('||'),
        paren_left: $ => token('('),
        paren_right: $ => token(')'),
        semicolon: $ => token(';'),
        star: $ => token('*'),
        tilde: $ => token('~'),
        underscore: $ => token('_'),
        xor: $ => token('^'),
        plus_equal: $ => token('+='),
        minus_equal: $ => token('-='),
        times_equal: $ => token('*='),
        division_equal: $ => token('/='),
        modulo_equal: $ => token('%='),
        and_equal: $ => token('&='),
        or_equal: $ => token('|='),
        xor_equal: $ => token('^='),
        shift_right_equal: $ => token('>>='),
        shift_left_equal: $ => token('<<='),
        interpolation_type_name: $ => choice(
            token('perspective'),
            token('linear'),
            token('flat')
        ),
        interpolation_sample_name: $ => choice(
            token('center'),
            token('centroid'),
            token('sample')
        ),
        builtin_value_name: $ => choice(
            token('vertex_index'),
            token('instance_index'),
            token('position'),
            token('front_facing'),
            token('frag_depth'),
            token('local_invocation_id'),
            token('local_invocation_index'),
            token('global_invocation_id'),
            token('workgroup_id'),
            token('num_workgroups'),
            token('sample_index'),
            token('sample_mask')
        ),
        access_mode: $ => choice(
            token('read'),
            token('write'),
            token('read_write')
        ),
        texel_format: $ => choice(
            token('rgba8unorm'),
            token('rgba8snorm'),
            token('rgba8uint'),
            token('rgba8sint'),
            token('rgba16uint'),
            token('rgba16sint'),
            token('rgba16float'),
            token('r32uint'),
            token('r32sint'),
            token('r32float'),
            token('rg32uint'),
            token('rg32sint'),
            token('rg32float'),
            token('rgba32uint'),
            token('rgba32sint'),
            token('rgba32float')
        ),
        extension_name: $ => token('f16'),
        swizzle_name: $ => choice(
            token('/[rgba]/'),
            token('/[rgba][rgba]/'),
            token('/[rgba][rgba][rgba]/'),
            token('/[rgba][rgba][rgba][rgba]/'),
            token('/[xyzw]/'),
            token('/[xyzw][xyzw]/'),
            token('/[xyzw][xyzw][xyzw]/'),
            token('/[xyzw][xyzw][xyzw][xyzw]/')
        ),
        _reserved: $ => choice(
            token('AppendStructuredBuffer'),
            token('BlendState'),
            token('Buffer'),
            token('ByteAddressBuffer'),
            token('CompileShader'),
            token('ComputeShader'),
            token('ConsumeStructuredBuffer'),
            token('DepthStencilState'),
            token('DepthStencilView'),
            token('DomainShader'),
            token('GeometryShader'),
            token('Hullshader'),
            token('InputPatch'),
            token('LineStream'),
            token('NULL'),
            token('OutputPatch'),
            token('PixelShader'),
            token('PointStream'),
            token('RWBuffer'),
            token('RWByteAddressBuffer'),
            token('RWStructuredBuffer'),
            token('RWTexture1D'),
            token('RWTexture1DArray'),
            token('RWTexture2D'),
            token('RWTexture2DArray'),
            token('RWTexture3D'),
            token('RasterizerState'),
            token('RenderTargetView'),
            token('SamplerComparisonState'),
            token('SamplerState'),
            token('Self'),
            token('StructuredBuffer'),
            token('Texture1D'),
            token('Texture1DArray'),
            token('Texture2D'),
            token('Texture2DArray'),
            token('Texture2DMS'),
            token('Texture2DMSArray'),
            token('Texture3D'),
            token('TextureCube'),
            token('TextureCubeArray'),
            token('TriangleStream'),
            token('VertexShader'),
            token('abstract'),
            token('active'),
            token('alignas'),
            token('alignof'),
            token('as'),
            token('asm'),
            token('asm_fragment'),
            token('async'),
            token('atomic_uint'),
            token('attribute'),
            token('auto'),
            token('await'),
            token('become'),
            token('bf16'),
            token('binding_array'),
            token('cast'),
            token('catch'),
            token('cbuffer'),
            token('char'),
            token('class'),
            token('co_await'),
            token('co_return'),
            token('co_yield'),
            token('coherent'),
            token('column_major'),
            token('common'),
            token('compile'),
            token('compile_fragment'),
            token('concept'),
            token('const_cast'),
            token('consteval'),
            token('constexpr'),
            token('constinit'),
            token('crate'),
            token('debugger'),
            token('decltype'),
            token('delete'),
            token('demote'),
            token('demote_to_helper'),
            token('do'),
            token('dword'),
            token('dynamic_cast'),
            token('enum'),
            token('explicit'),
            token('export'),
            token('extends'),
            token('extern'),
            token('external'),
            token('f64'),
            token('filter'),
            token('final'),
            token('finally'),
            token('fixed'),
            token('friend'),
            token('from'),
            token('fvec2'),
            token('fvec3'),
            token('fvec4'),
            token('fxgroup'),
            token('get'),
            token('goto'),
            token('groupshared'),
            token('handle'),
            token('highp'),
            token('hvec2'),
            token('hvec3'),
            token('hvec4'),
            token('i16'),
            token('i64'),
            token('i8'),
            token('iimage1D'),
            token('iimage1DArray'),
            token('iimage2D'),
            token('iimage2DArray'),
            token('iimage2DMS'),
            token('iimage2DMSArray'),
            token('iimage2DRect'),
            token('iimage3D'),
            token('iimageBuffer'),
            token('iimageCube'),
            token('iimageCubeArray'),
            token('image1D'),
            token('image1DArray'),
            token('image2D'),
            token('image2DArray'),
            token('image2DMS'),
            token('image2DMSArray'),
            token('image2DRect'),
            token('image3D'),
            token('imageBuffer'),
            token('imageCube'),
            token('imageCubeArray'),
            token('impl'),
            token('implements'),
            token('import'),
            token('inline'),
            token('inout'),
            token('instanceof'),
            token('interface'),
            token('invariant'),
            token('isampler1D'),
            token('isampler1DArray'),
            token('isampler2D'),
            token('isampler2DArray'),
            token('isampler2DMS'),
            token('isampler2DMSArray'),
            token('isampler2DRect'),
            token('isampler3D'),
            token('isamplerBuffer'),
            token('isamplerCube'),
            token('isamplerCubeArray'),
            token('isubpassInput'),
            token('isubpassInputMS'),
            token('itexture1D'),
            token('itexture1DArray'),
            token('itexture2D'),
            token('itexture2DArray'),
            token('itexture2DMS'),
            token('itexture2DMSArray'),
            token('itexture2DRect'),
            token('itexture3D'),
            token('itextureBuffer'),
            token('itextureCube'),
            token('itextureCubeArray'),
            token('layout'),
            token('line'),
            token('lineadj'),
            token('lowp'),
            token('macro'),
            token('macro_rules'),
            token('mat'),
            token('match'),
            token('matrix'),
            token('mediump'),
            token('meta'),
            token('mod'),
            token('module'),
            token('move'),
            token('mut'),
            token('mutable'),
            token('namespace'),
            token('new'),
            token('nil'),
            token('noexcept'),
            token('noinline'),
            token('nointerpolation'),
            token('noperspective'),
            token('null'),
            token('nullptr'),
            token('of'),
            token('operator'),
            token('package'),
            token('packoffset'),
            token('partition'),
            token('pass'),
            token('patch'),
            token('pixelfragment'),
            token('point'),
            token('precise'),
            token('precision'),
            token('premerge'),
            token('priv'),
            token('protected'),
            token('pub'),
            token('public'),
            token('readonly'),
            token('ref'),
            token('regardless'),
            token('register'),
            token('reinterpret_cast'),
            token('requires'),
            token('resource'),
            token('restrict'),
            token('row_major'),
            token('samper'),
            token('sampler1D'),
            token('sampler1DArray'),
            token('sampler1DArrayShadow'),
            token('sampler1DShadow'),
            token('sampler2D'),
            token('sampler2DArray'),
            token('sampler2DArrayShadow'),
            token('sampler2DMS'),
            token('sampler2DMSArray'),
            token('sampler2DRect'),
            token('sampler2DRectShadow'),
            token('sampler2DShadow'),
            token('sampler3D'),
            token('sampler3DRect'),
            token('samplerBuffer'),
            token('samplerCube'),
            token('samplerCubeArray'),
            token('samplerCubeArrayShadow'),
            token('samplerCubeShadow'),
            token('samplerShadow'),
            token('self'),
            token('set'),
            token('shared'),
            token('signed'),
            token('sizeof'),
            token('smooth'),
            token('snorm'),
            token('stateblock'),
            token('stateblock_state'),
            token('static'),
            token('static_assert'),
            token('static_cast'),
            token('std'),
            token('string'),
            token('subpassInput'),
            token('subpassInputMS'),
            token('subroutine'),
            token('super'),
            token('superp'),
            token('target'),
            token('tbuffer'),
            token('technique'),
            token('technique10'),
            token('technique11'),
            token('template'),
            token('texture1D'),
            token('texture1DArray'),
            token('texture2D'),
            token('texture2DArray'),
            token('texture2DMS'),
            token('texture2DMSArray'),
            token('texture2DRect'),
            token('texture3D'),
            token('textureBuffer'),
            token('textureCube'),
            token('textureCubeArray'),
            token('this'),
            token('thread_local'),
            token('throw'),
            token('trait'),
            token('triangle'),
            token('triangleadj'),
            token('try'),
            token('typedef'),
            token('typeid'),
            token('typename'),
            token('typeof'),
            token('u16'),
            token('u64'),
            token('u8'),
            token('uimage1D'),
            token('uimage1DArray'),
            token('uimage2D'),
            token('uimage2DArray'),
            token('uimage2DMS'),
            token('uimage2DMSArray'),
            token('uimage2DRect'),
            token('uimage3D'),
            token('uimageBuffer'),
            token('uimageCube'),
            token('uimageCubeArray'),
            token('union'),
            token('unless'),
            token('unorm'),
            token('unsafe'),
            token('unsigned'),
            token('unsized'),
            token('usampler1D'),
            token('usampler1DArray'),
            token('usampler2D'),
            token('usampler2DArray'),
            token('usampler2DMS'),
            token('usampler2DMSArray'),
            token('usampler2DRect'),
            token('usampler3D'),
            token('usamplerBuffer'),
            token('usamplerCube'),
            token('usamplerCubeArray'),
            token('use'),
            token('using'),
            token('usubpassInput'),
            token('usubpassInputMS'),
            token('utexture1D'),
            token('utexture1DArray'),
            token('utexture2D'),
            token('utexture2DArray'),
            token('utexture2DMS'),
            token('utexture2DMSArray'),
            token('utexture2DRect'),
            token('utexture3D'),
            token('utextureBuffer'),
            token('utextureCube'),
            token('utextureCubeArray'),
            token('varying'),
            token('vec'),
            token('vector'),
            token('vertexfragment'),
            token('virtual'),
            token('void'),
            token('volatile'),
            token('wchar_t'),
            token('wgsl'),
            token('where'),
            token('with'),
            token('writeonly'),
            token('yield')
        ),
        ident: $ => $.ident_pattern_token,
        _comment: $ => seq(token('//'), token(/.*/)),
        _blankspace: $ => token(/[\u0020\u0009\u000a\u000b\u000c\u000d\u0085\u200e\u200f\u2028\u2029]/uy)
    },
});