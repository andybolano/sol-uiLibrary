import { SetupContext, computed, defineComponent, ref, watchEffect } from "vue"
import CusInput from "../cus-input/CusInput.vue"
import type { ItemType } from "./interfaces/ItemType"
import clickOutside from "@/app/shared/directives/ClickOutSide"

export default defineComponent({
	extends: CusInput,
	name: "CusSearch",
	components: {
		CusInput,
	},
	directives: {
		clickOutside,
	},
	props: {
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
			type: String,
			required: true,
		},
	},
	setup(props, { emit }: SetupContext) {
		const value = computed({
			get() {
				return props.modelValue
			},
			set(value) {
				emit("update:modelValue", value)
			},
		})

		const showList = ref(false)

		watchEffect(() => {
			showList.value =
				props.isLoadingResults || props.itemsResults.length > 0
		})

		const closeList = () => {
			showList.value = false
		}

		const handleActiveOption = (option: ItemType) => {
			closeList()
			emit("changeOption", option)
		}

		return {
			closeList,
			handleActiveOption,
			value,
			showList,
		}
	},
})
