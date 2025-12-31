import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useEffect, useRef } from "react";
import type { UseFormReturn, FieldValues, Path } from "react-hook-form";

interface CKEditorProps<T extends FieldValues> {
	form: UseFormReturn<T>;
	name: Path<T>;
	editorLoaded?: boolean;
}

interface EditorInstance {
	getData: () => string;
}

const CKEditor = <T extends FieldValues>({ form, name, editorLoaded }: CKEditorProps<T>) => {
	const editorRef = useRef<{ CKEditor: React.ComponentType<{ editor: unknown; data: string; onChange: (event: unknown, editor: EditorInstance) => void }>; ClassicEditor: unknown } | null>(null);
	const { CKEditor: CKEditorComponent, ClassicEditor } = editorRef.current || {};

	useEffect(() => {
		editorRef.current = {
			CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
			ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
		};
	}, []);

	return (
		<>
			{editorLoaded && CKEditorComponent ? (
				<div>
					<CKEditorComponent
						editor={ClassicEditor}
						data={form.getValues(name)}
						onChange={(_event: unknown, editor: EditorInstance) => {
							const data = editor.getData();
							form.setValue(name, data as T[typeof name]);
						}}
					/>
					<FormField
						control={form.control}
						name={name}
						render={({ field }) => (
							<FormItem>
								<FormMessage className="mt-3" />
							</FormItem>
						)}
					/>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</>
	);
};

export default CKEditor;
