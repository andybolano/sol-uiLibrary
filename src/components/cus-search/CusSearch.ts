import { SetupContext, defineComponent, ref } from "vue"
import CusInput from "../cus-input/CusInput.vue"
import SearchResults from "./components/SearchResults.vue"
import { ItemType } from "./interfaces/ItemType"

export default defineComponent({
	name: "CusSearch",
	components: {
		CusInput,
		SearchResults,
	},
	props: {
		label: {
			type: String,
			default: "",
		},
		placeholder: {
			type: String,
			default: "",
		},
		textLoading: {
			type: String,
			default: "Loading...",
		},
		itemsResults: {
			type: Array as () => ItemType[],
			default: () => [],
		},
		isLoadingResults: {
			type: Boolean,
			default: false,
		},
		modelValue: {
			type: [String, Number],
		},
	},

	setup(prop, { emit }: SetupContext) {
		const value = ref(prop.modelValue)
		const handleItemSelected = (item: ItemType) => {
			value.value = item.name
			emit("itemSelected", item)
		}

		return {
			handleItemSelected,
			value,
		}
	},
})
