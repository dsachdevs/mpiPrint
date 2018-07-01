	mpiapp.service('dataStore', [ function($q){

	this.quotenos = 0;

	this.dataObj = {
		heading : {
			loggeduser : "",
			quote : "00000",
			parent : "00000",
			date : "",
			client : "",
			specs : ["","",""],
			trimW : "",
			trimH : "",
			txtnos : 0,
			cvrnos : 0,
			cvrstock : "",
			cvrsize: "",
			cvrcolor1 : 4,
			cvrcolor2 : 4,
			cvruv : "N",
			cvraq : "N",
			txtstock : "",
			txtsize: "",
			txtcolor1 : 4,
			txtcolor2 : 4
		},

		quantity: {
			qty_lang : ["English", "French", "Other"],
			qty_arr : [[],[],[]],
			//qty_arr : [{qty_eng : []}, {qty_fren : []}, {qty_othr : []}],
			qty_tot : []
		},

		cover:{
			cvr_lang : ["Net Sheets", "Press Spoils", "Bindery Overs"],
			cvr_parms : { cvr_ups: "", cvr_cwt: "", cvr_mweight: "", cvr_perMillion:""},
			// cvr_arr : [{net_sheet : []}, {press_spoils : []}, {bindery_overs : []}],
			cvr_arr : [[],[],[]],
			cvr_gross : [],
			cvr_tot : []
		},

		text:{
			txt_lang : ["Net Sheets", "Press Spoils", "Bindery Overs"],
			txt_parms : { txt_ups: "", txt_cwt: "", txt_mweight: "", txt_perMillion:""},
			//txt_arr : [{net_sheet : []}, {press_spoils : []}, {bindery_overs : []}],
			txt_arr : [[],[],[]],
			txt_gross : [],
			txt_tot : []
		},

		print:{
			prt_lang : ["Impression 1", "Impression 2", "Plates & MR", "M/R W+T", "Running 1", "Running 2"],
			prt_parm_lang : ["Freight", "Weight", "Ctns", "Skids"],
			prt_parm_arr : [[],[],[],[]],
			prt_user_parm : [],
			prt_arr : [{Impression1 : []}, {Impression2 : []}, {PlatesMR : []}, {MRWT : []}, {Running1 : []}, {Running2 : []} ],
			prt_tot : []
		},

		bindery:{
			bnd_cutting: {"MR": "", "RunM": ""},
			bnd_fold_parm: ["4pp", "8pp", "12/16pp", "24/32pp"],
			bnd_fold_pval: {"4pp" : "" , "8pp" : "", "12/16pp": "", "24/32pp": ""},
			bnd_folding: {"MR": [], "RunM": []},
			bnd_stitching: {"MR": "", "RunM": ""},
			bnd_other : {bnd_other_cost: {"Other_Cost1" : "", "Other_Cost2" : "", "Cartoon" : ""}, bnd_other_comment: []},
			bnd_freight:{"cost": "", "comment": ""},
			// bnd_arr : [{Cutting : []}, {Folding1 : []}, {Folding2 : []}, {Folding3 : []}, {Folding4 : []}, {Stitching : []} ],
			bnd_arr : [[],[],[],[],[],[]],
			bnd_arr2 : [[],[],[],[]],
			// bnd_arr2 : [{OtherCost : []}, {OtherCost : []}, {Cartoon : []}, {Freight : []}],
			bnd_tot : []
		},
		
		totals : {
			ex_rate: 0,
			currency: "",
			total: [],
			cvt_total: []
		},

		validation : {
			validClient: true,
			validTxtNos: true,
			validCvrNos: true,
			validCvrStock:  true,
			validCvrSize:  true,
			validTxtStock:  true,
			validTxtSize:  true,
			validQuantity: true,
			quoteSaved: false
		}
	};
	
}]);