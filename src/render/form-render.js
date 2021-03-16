module.exports = {
    generate_Form : (data) => {
        const dataRendered = []
        for(let inaktif of data){
            dataRendered.push(`
            <tr>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <input class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" type="checkbox" />
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div class="text-sm leading-5 text-gray-900">
                        {{page.name}}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">

                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <img class="h-10 w-10 rounded-full"
                                src="https://via.placeholder.com/400x400"
                                alt=""/>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm leading-5 font-medium text-gray-900">
                            </div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div class="text-sm leading-5 text-gray-900">
                        {{page.slug}}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        published
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                    {{page.created_at}}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                    <a href="#"
                        class="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline" >
                        Show
                    </a>
                </td>
            </tr>
            `)
        }
        return dataRendered.join('')
    }
}