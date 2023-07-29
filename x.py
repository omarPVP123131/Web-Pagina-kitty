def generate_html_element(tag_name, content, num_times, enumerate_results=False):
    element_html = ""

    for i in range(num_times):
        if enumerate_results:
            element_html += f"<{tag_name} src='/renamed_images/{str(i + 1).zfill(4)}.jpg' alt='{content} {i + 1}'>\n"
        else:
            element_html += f"<{tag_name} src='/renamed_images/{content}.jpg' alt='{content}'>\n"

    return element_html

# Ejemplo de uso:
element_type = input("Ingrese el tipo de elemento (por ejemplo, img, a, li): ")
element_content = input("Ingrese el contenido del elemento (escribe el alt ejemplo:alt='imagen 1' ): ")
num_times = int(input("Ingrese cuántas veces desea repetir el elemento: "))
enumerate_results = input("¿Desea enumerar los resultados? (s/n): ").lower().startswith('s')

result = generate_html_element(element_type, element_content, num_times, enumerate_results)
print(result)
