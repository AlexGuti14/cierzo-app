const mongoose = require('mongoose');

const DistrictDB = new mongoose.Schema({
	districtId: {
		type: Number,
		unique: true,
		required: true,
		index: true
	},
	name : {
		type: String,
		required: true,
	},
	estrellas : {
		type: Number,
		required: true,
	},
	conectividad : {
		estrellas : {
			type: Number,
			required: true,
		},
		paradataxis: {
			type: Number,
			required: true,
		},
		paradasbus: {
			type: Number,
			required: true,
		},
		paradastranvia: {
			type: Number,
			required: true,
		},
		aparcamientosCoche: {
			type: Number,
			required: true,
		},
		aparcamientosBicis: {
			type: Number,
			required: true,
		},
		aparcamientosMotos: {
			type: Number,
			required: true,
		}
	},
	demografia : {
		edadmedia : {
			type: Number,
			required: true,
		},
		poblacionjuvenil: {
			grp_0_3: {
				type: Number,
				required: true,
			},
			grp_4_11: {
				type: Number,
				required: true,
			},
			grp_12_15: {
				type: Number,
				required: true,
			},
			grp_16_18: {
				type: Number,
				required: true,
			},
		},
		poblacionenvejecida: {
			type: Number,
			required: true,
		},
		densidadPoblacion : {
			type: Number,
			required: true,
		}
	},
	economia : {
		estrellas : {
			type: Number,
			required: true,
		},
		renta: {
			type: Number,
			required: true,
		}
	},
	cultura : {
		estrellas : {
			type: Number,
			required: true,
		},
		monumentos: {
			type: Number,
			required: true,
		},
		restaurantes: {
			type: Number,
			required: true,
		},
		hoteles: {
			type: Number,
			required: true,
		},
		puntointeres: {
			type: Number,
			required: true,
		},
		artepublico: {
			type: Number,
			required: true,
		}
	}
});


mongoose.model('DistrictDB', DistrictDB);